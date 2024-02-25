import { describe, it, expect, vi, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import PostCard from "../components/PostCard.vue";
import { createPinia, setActivePinia } from "pinia";
import { usePosts } from "@/stores/postsStore";

describe("PostCard", () => {
  let wrapper: VueWrapper;
  const mockPost = {
    id: 1,
    userId: 1,
    title: "Test Post",
    body: "This is a test post",
  };

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    usePosts().movePost = vi.fn();

    wrapper = mount(PostCard, {
      global: {
        plugins: [pinia],
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
    await wrapper.find(".chevron-up").trigger("click");
    expect(usePosts().movePost).toHaveBeenCalledWith(mockPost.id, 1, 0);

    await wrapper.find(".chevron-down").trigger("click");
    expect(usePosts().movePost).toHaveBeenCalledWith(mockPost.id, 1, 2);
  });
});
