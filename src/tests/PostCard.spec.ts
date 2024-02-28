import { describe, it, expect, vi, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import PostCard from "../components/PostCard.vue";
import { usePosts } from "@/stores/postsStore";
import { createTestingPinia } from "@pinia/testing";

describe("PostCard", () => {
  let wrapper: VueWrapper;
  const mockPost = {
    id: 1,
    userId: 1,
    title: "Test Post",
    body: "This is a test post",
  };

  beforeEach(() => {
    wrapper = mount(PostCard, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        post: mockPost,
        index: 1,
        showUpIcon: true,
        showDownIcon: true,
      },
    });
  });

  it("renders the post ID", () => {
    expect(wrapper.text()).toContain(`Post ${mockPost.id}`);
  });

  it("conditionally renders ChevronUpIcon and ChevronDownIcon based on props", async () => {
    await wrapper.vm.$nextTick();

    const chevronUp = wrapper.find(".chevron-up");
    const chevronDown = wrapper.find(".chevron-down");

    expect(chevronUp.exists()).toBe(true);
    expect(chevronDown.exists()).toBe(true);
  });

  it("does not render ChevronUpIcon when showUpIcon is false", async () => {
    await wrapper.setProps({ showUpIcon: false });
    await wrapper.vm.$nextTick();

    const chevronUp = wrapper.find(".chevron-up");
    expect(chevronUp.exists()).toBe(false);
  });

  it("calls movePost with correct parameters when icons are clicked", async () => {
    usePosts().movePost = vi.fn();
    await wrapper.find(".chevron-up").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("movePost");

    await wrapper.find(".chevron-down").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("movePost");
  });
});
