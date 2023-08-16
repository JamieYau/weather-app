import fetchData from "../modules/api";

describe("fetchData", () => {
  it("fetches data", async () => {
    const data = await fetchData("New York");
    expect(data).toBeDefined();
  });
});
