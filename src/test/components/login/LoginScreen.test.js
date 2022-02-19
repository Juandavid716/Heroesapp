import { mount } from "enzyme";
import { Navbar } from "./../../../ui/Navbar";
import { AuthContext } from "./../../../auth/authContext";
import { MemoryRouter } from "react-router-dom";
import { LoginScreen } from "./../../../components/login/LoginScreen";
import { types } from "./../../../types/types";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("Pruebas en LoginComponent", () => {
  const mockDispatch = jest.fn();
  const contextValue = {
    user: {
      logged: false,
    },
    dispatch: mockDispatch,
  };
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
  test("debe de hacer match/mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de realizar el dispatch y la navegacion", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: "Pepe" },
    });
    expect(mockNavigate).toHaveBeenCalledWith("/marvel", { replace: true });

    localStorage.setItem("lastPath", "/dc");

    handleClick();
    expect(mockNavigate).toHaveBeenCalledWith("/dc", { replace: true });
  });
});
