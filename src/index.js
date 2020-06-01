const getRandomBoolean = () => Math.random() >= 0.5; // получить случайное true|false
const getRandomTimeout = () => Math.random() * 1000; // получить случайное время от 0 до 10 секунд

/*
Список статусов https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP
нужно реазиловать 200 / 201 / 400/ 404 / 500 
*/

const timeout = getRandomTimeout();
const randomBooleam = getRandomBoolean();

class Request {
  constructor() {
    this.todos = [];
  }

  get(partLine) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (partLine === "/todos" && randomBooleam) ||
          (partLine === "/todos?filter=all" && randomBooleam)
        ) {
          resolve({
            status: 200,
            data: this.todos
          });
        } else if (partLine === "/todos?filter=active" && randomBooleam) {
          resolve({
            status: 201,
            data: this.todos.filter(todo => todo.completed === false)
          });
        } else if (partLine === "/todos?filter=completed" && randomBooleam) {
          resolve({
            status: 200,
            data: this.todos.filter(todo => todo.completed === true)
          });
        } else {
          reject({
            status: 404,
            message: `Not Found: ${partLine}`
          });
        }
      }, timeout);
    });
  }

  post(partLine, obj) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        obj.body.completed = false;
        if (partLine === "/todos" && randomBooleam) {
          this.todos = [...this.todos, obj.body];
          resolve({
            status: 201,
            message: `todo successfully created`
          });
        } else {
          reject({
            status: 400,
            message: `Invalid request: ${partLine}`
          });
        }
      }, timeout);
    });
  }

  put(partLine, obj) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let x = partLine[partLine.length - 1];
        if (partLine && randomBooleam) {
          this.todos.map((todo, todoIndex) => {
            if (x === todoIndex) {
              return { ...todo, ...obj.body };
            }
            return todo;
          });
          resolve({
            status: 200,
            message: `todo successfully updated`
          });
        } else {
          reject({
            status: 500,
            message: `Internal Server Error`
          });
        }
      }, timeout);
    });
  }

  delete(partLine) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let i = partLine[partLine.length - 1];
        if (partLine && randomBooleam) {
          this.todos.filter((_, todoIndex) => i !== todoIndex);
          resolve({
            status: 200,
            message: `todo successfully deleted`
          });
        } else {
          reject({
            status: 404,
            message: `Error: index ${i} not found`
          });
        }
      }, timeout);
    });
  }
}

const request = new Request();

// запросить todos
request
  .get("/todos")
  .then(response => {
    console.log(response); // массив todos
  })
  .catch(error => {
    console.log(error); // не верный url, например todoc
  });

// фильтрованные todos
// request
//   .get("/todos?filter=all")
//   .then(response => {
//     console.log(response); // массив todos
//   })
//   .catch(error => {
//     console.log(error); // не верный url, например todoc
//   });

// // Создание todo
// request
//   .post("/todos", {
//     body: {
//       title: "New todo",
//       description: "Some text"
//     }
//   })
//   .then(response => {
//     console.log(response); // массив todos
//   })
//   .catch(error => {
//     console.log(error); // не верный url, например todoc
//   });

// //обновление todo
// request
//   .put("/todos/1", {
//     body: {
//       title: "New todo"
//       // description: "Some text" // можно обновить лбое поле или поля или нет записи под index = 1
//     }
//   })
//   .then(response => {
//     console.log(response); // массив todos
//   })
//   .catch(error => {
//     console.log(error); // не верный url, например todoc
//   });

// //удаление todo
// request
//   .delete("/todos/1")
//   .then(response => {
//     console.log(response); // массив todos
//   })
//   .catch(error => {
//     console.log(error); // не верный url, например todoc
//   });
