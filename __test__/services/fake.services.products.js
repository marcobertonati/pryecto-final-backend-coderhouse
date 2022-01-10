const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("TEST API REST => Productos findAll", () => {
  it("Deberia retornar un status 200", async () => {
    let response = await request.get("/api/product/");
    expect(response.status).to.eql(200);
  });
});

describe("TEST API REST => Producto by ID", () => {
  it("Deberia retornar un el mismo ID del producto consultado", async () => {
    let ID = "6144c8bc5dd28c2628026a33";
    let response = await request.get(`/api/product/${ID}`);
    expect(response.body._id).to.eql(ID);
  });

  it("Deberia retornar FALSE si no existe el id", async () => {
    let ID = "este-es-un-id-falso";
    let response = await request.get(`/api/product/${ID}`);
    expect(response.body.productFinded).to.eql(false);
  });
});

describe("TEST API REST => Update by ID", () => {
  it("Deberia retornar un producto", async () => {
    /*Remplazar valor de ID por producto a updatear */
    let ID = "6144c8bc5dd28c2628026a33";
    /*Remplazar objeto con propiedades: title, price, thumbnail, timestamp, description, code, stock */
    let dataUpdated = { title: "Remera Puma FORZA modificada" };
    let response = await request
      .patch(`/api/product/update/${ID}`)
      .send(dataUpdated);
    expect(response.status).to.eql(200);
  });

  it("Deberia retornar FALSE si no existe el id", async () => {
    let ID = "este-es-un-id-falso";
    let response = await request.get(`/api/product/${ID}`);
    expect(response.body.productFinded).to.eql(false);
  });
});

describe("TEST API REST => Delete by ID", () => {
  it("Deberia retornar un producto", async () => {
    /*Remplazar valor de ID por producto a eliminar */
    let ID = "6199190b292b5e99db26615b";
    let response = await request.delete(`/api/product/delete/${ID}`);
    expect(response.status).to.eql(200);
  });

  it("Deberia retornar FALSE si no existe el id", async () => {
    let ID = "este-es-un-id-falso";
    let response = await request.get(`/api/product/${ID}`);
    expect(response.body.productFinded).to.eql(false);
  });
});
