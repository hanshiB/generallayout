import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

describe("PasswordAttributeModel", () => {
  it("should be able to create an empty PasswordAttribute object", () => {
    const attribute = new PasswordAttributeModel();

    expect(attribute instanceof PasswordAttributeModel).toBe(true);
    expect(attribute.type).toBe("password");
  });
});
