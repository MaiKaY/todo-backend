import { TodoAlreadyCompleted } from '../../../src/1.domain/exception/TodoAlreadyCompleted';
import { TodoDoesNotExists } from '../../../src/1.domain/exception/TodoDoesNotExists';
import { TodoList } from '../../../src/1.domain/TodoList';

test('create new todo', () => {
    let todoList = TodoList.fromEvents([]);
    todoList = todoList.create('create a boilerplate repository');

    expect(todoList.todos.length).toBe(1);
    expect(todoList.todos[0].isCompleted).toBeFalsy();
    expect(todoList.todos[0].timeline.createdAt).toBeDefined();
    expect(todoList.todos[0].timeline.completedAt).toBeUndefined();
});

test('complete todo', () => {
    let todoList = TodoList.fromEvents([]);
    todoList = todoList.create('create a boilerplate repository');
    todoList = todoList.create('create some unit tests');
    todoList = todoList.complete(todoList.todos[0].id);

    expect(todoList.todos[0].isCompleted).toBeTruthy();
    expect(todoList.todos[0].timeline.completedAt).toBeDefined();
    expect(todoList.todos[1].isCompleted).toBeFalsy();
});

test('complete non existing todo should fail', () => {
    const todoList = TodoList.fromEvents([]);
    expect(() => {
        todoList.complete('some non existing id');
    }).toThrow(TodoDoesNotExists);
});

test('complete todo second time should fail', () => {
    let todoList = TodoList.fromEvents([]);
    todoList = todoList.create('create some unit tests');
    todoList = todoList.complete(todoList.todos[0].id);
    expect(() => {
        todoList = todoList.complete(todoList.todos[0].id);
    }).toThrow(TodoAlreadyCompleted);
});
