import weatherAPI from "../modules/weatherAPI";

describe("fetchData", () => {
  it("fetches data", async () => {
    const data = await weatherAPI.fetchData("New York");
    expect(data).toBeDefined();
  });
});
