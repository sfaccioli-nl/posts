import { describe, it, expect, vi, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ActionCard from "../components/ActionCard.vue";
import Button from "@/components/ui/Button.vue";
import { useActions } from "@/stores/actionsStore";

describe("YourComponent", () => {
  let wrapper: VueWrapper;
  const mockAction = {
    postId: 1,
    from: 0,
    to: 1,
  };

  beforeEach(() => {
    wrapper = mount(ActionCard, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        action: mockAction,
        index: 0,
      },
    });
  });

  it("renders the action description correctly", () => {
    const actionText = `Moved post ${mockAction.postId} from index ${mockAction.from} to index ${mockAction.to}`;
    expect(wrapper.text()).toContain(actionText);
  });

  it("calls timeTravel when the button is clicked", async () => {
    const actionsStore = useActions();

    actionsStore.timeTravel = vi.fn();

    await wrapper.findComponent(Button).trigger("click");

    expect(actionsStore.timeTravel).toHaveBeenCalledWith(0);
  });
});
