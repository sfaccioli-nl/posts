import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PostCard from "../components/PostCard.vue";
import { createPinia, setActivePinia } from "pinia";

describe("PostCard", () => {
  it("renders the post ID", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const mockPost = {
      id: 1,
      userId: 1,
      title: "Test Post",
      body: "This is a test post",
    };

    const wrapper = await mount(PostCard, {
      global: {
        plugins: [pinia],
      },
      props: {
        post: mockPost,
        index: 0,
        showUpIcon: true,
        showDownIcon: true,
      },
    });

    expect(wrapper.text()).toContain(`Post ${mockPost.id}`);
  });
});
