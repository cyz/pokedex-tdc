import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadMoreButton } from "@/app/components/LoadMoreButton";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams("q=pika&type=electric&generation=1"),
}));

describe("LoadMoreButton", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("preserva filtros e aumenta o limite", async () => {
    const user = userEvent.setup();
    render(<LoadMoreButton currentLimit={24} />);

    await user.click(screen.getByRole("button", { name: "Carregar mais" }));

    expect(push).toHaveBeenCalledWith("/?q=pika&type=electric&generation=1&limit=48", {
      scroll: false,
    });
  });
});