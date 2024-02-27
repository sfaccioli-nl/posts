import { describe, it, expect, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ActionsList from "@/components/ActionsList.vue";
import { useActions } from "@/stores/actionsStore";

describe("PostsList", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      stubActions: false,
    });

    wrapper = mount(ActionsList, {
      global: {
        plugins: [testingPinia],
      },
    });
  });

  it("renders correctly with no actions", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("No actions commited yet");
  });

  it("applies correct classes with multiple actions", async () => {
    const actionsStore = useActions();

    actionsStore.actions = [
      { postId: 1, from: 0, to: 1, snapshot: [] },
      { postId: 3, from: 3, to: 4, snapshot: [] },
    ];

    await wrapper.vm.$nextTick();

    const actionCards = wrapper.findAllComponents(".action-card");
    expect(actionCards.length).toBe(2);

    expect(actionCards[0].classes()).toContain("rounded-t");
    expect(actionCards[1].classes()).toContain("rounded-b");
    expect(actionCards[0].classes()).toContain("border-b");
    expect(actionCards[1].classes()).not.toContain("border-b");
  });
});
