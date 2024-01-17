process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app")
let items = require("../fakeDb")

let milk = {"name": "milk", "price":"4"}

beforeEach(function(){
    items.push(milk)
});

afterEach(function(){
    items.length=0
});

describe("GET /items", function(){
    test("get all items", async function(){
        const resp = await request(app).get("/items")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"items":[milk]})
    })
})

describe("POST /items", function(){
  test("create item", async function(){
      const resp = await request(app).post('/items').send({"name":"gummy bears", "price":"3"})
      expect(resp.statusCode).toBe(200)
      expect(resp.body).toEqual({"item":{"name":"gummy bears", "price":"3"}})
      expect(items.length).toEqual(2)
  })
})

describe("PATCH /items/:name", function(){
  test("update a item", async function(){
    const resp = await request(app).patch(`/items/${milk.name}`).send({"name":"chocolate milk","price":"5"})
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual({"name":"chocolate milk","price":"5"})
    expect(items.length).toEqual(1)
  });
  test("404 with invalid name", async function(){
    const resp = await request(app).patch("/items/silk")
    expect(resp.statusCode).toBe(404)
  })
})

describe("DELETE /items/:name", function(){
  test("delete item", async function(){
    const resp = await request(app).delete(`/items/${milk.name}`)
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual({"message":"deleted"})
  })
})