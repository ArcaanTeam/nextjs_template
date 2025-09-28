import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./page";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, ...rest } = props;
    return <img src={src} alt={alt} width={width} height={height} {...rest} />;
  },
}));

describe("Home Page", () => {
  it("renders the Next.js logo", () => {
    render(<Home />);
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/next.svg");
  });

  it("displays the getting started instructions", () => {
    render(<Home />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    expect(listItems[0]).toHaveTextContent(
      "Get started by editing src/app/page.tsx"
    );
    expect(listItems[1]).toHaveTextContent(
      "Save and see your changes instantly."
    );
  });

  it("renders code element with correct styling class", () => {
    render(<Home />);
    const codeElement = screen.getByText("src/app/page.tsx").closest("code");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveClass("bg-black/[.05]");
  });

  it("renders all primary action buttons with correct links", () => {
    render(<Home />);

    const deployButton = screen.getByRole("link", { name: /deploy now/i });
    expect(deployButton).toHaveAttribute(
      "href",
      "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
    expect(deployButton).toHaveClass("bg-foreground");

    const docsButton = screen.getByRole("link", { name: /read our docs/i });
    expect(docsButton).toHaveAttribute(
      "href",
      "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  it("renders footer navigation links", () => {
    render(<Home />);

    const learnLink = screen.getByRole("link", { name: /learn/i });
    expect(learnLink).toHaveAttribute(
      "href",
      "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );

    const examplesLink = screen.getByRole("link", { name: /examples/i });
    expect(examplesLink).toHaveAttribute(
      "href",
      "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );

    const nextjsLink = screen.getByRole("link", { name: /go to nextjs\.org/i });
    expect(nextjsLink).toHaveAttribute(
      "href",
      "https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  it("applies correct layout classes", () => {
    render(<Home />);
    const mainContainer = screen.getByRole("main").parentElement;
    expect(mainContainer).toHaveClass("font-sans");
    expect(mainContainer).toHaveClass("min-h-screen");
    expect(mainContainer).toHaveClass("grid");
  });
});
