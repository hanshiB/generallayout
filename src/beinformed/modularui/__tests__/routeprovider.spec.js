jest.mock("beinformed/util/fetch/universalFetch");
import Href from "beinformed/models/href/Href";
import routeprovider from "beinformed/modularui/routeprovider";

describe("routeprovider", () => {
  test("retrieve router configuration for root", () =>
    routeprovider(new Href("/")).then(routes => {
      expect(routes).toEqual([new Href("/")]);

      return true;
    }));

  test("retrieve router configuration for tab", () =>
    routeprovider(new Href("/books")).then(routes => {
      expect(routes).toEqual([new Href("/books"), new Href("/")]);

      return true;
    }));

  test("retrieve router configuration for caselist", () =>
    routeprovider(new Href("/books/books")).then(routes => {
      expect(routes).toEqual([
        new Href("/books/books"),
        new Href("/books"),
        new Href("/")
      ]);

      return true;
    }));

  test("retrieve router configuration for caseview", () =>
    routeprovider(new Href("/books/book/24")).then(routes => {
      expect(routes).toEqual([
        new Href("/books/book/24"),
        new Href("/books"),
        new Href("/")
      ]);

      return true;
    }));

  test("retrieve route configuration for concept", () =>
    routeprovider(
      new Href("/concepts/Persons/Knowledge%20model/Taxonomy.bixml/Belgium")
    ).then(routes => {
      expect(routes).toEqual([
        new Href("/concepts/Persons/Knowledge model/Taxonomy.bixml/Belgium"),
        new Href("/concepts"),
        new Href("/")
      ]);
    }));
});
