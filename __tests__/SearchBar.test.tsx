import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import SearchBar from "@/components/SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and button", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(
      screen.getByPlaceholderText("Enter city name...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Enter city name...");
    fireEvent.change(input, { target: { value: "London" } });

    expect(input).toHaveValue("London");
  });

  test("calls onSearch with trimmed query when form is submitted", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Enter city name...");
    fireEvent.change(input, { target: { value: "  London  " } });

    const form = input.closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnSearch).toHaveBeenCalledWith("London");
    expect(input).toHaveValue(""); // Should clear after submit
  });

  test("does not call onSearch when query is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const form = screen
      .getByPlaceholderText("Enter city name...")
      .closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
