import { describe, it, expect, beforeEach, vi } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import PostsList from "@/components/PostsList.vue";
import { usePosts } from "@/stores/postsStore";

const mockedPosts = [
  { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
  { id: 2, userId: 2, title: "Post 2", body: "Body 2" },
  { id: 3, userId: 3, title: "Post 3", body: "Body 3" },
  { id: 4, userId: 4, title: "Post 4", body: "Body 4" },
  { id: 5, userId: 5, title: "Post 5", body: "Body 5" },
  { id: 6, userId: 6, title: "Post 6", body: "Body 6" },
];

vi.mock("../api/postsAPI", async () => {
  const getPosts = vi.fn(() => Promise.resolve(mockedPosts));

  return { getPosts };
});

describe("PostsList", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      stubActions: false,
    });

    wrapper = mount(PostsList, {
      global: {
        plugins: [testingPinia],
      },
    });
  });

  it("fetches posts on mounted and displays the first five", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const postsStore = usePosts();
    expect(postsStore.initializePosts).toHaveBeenCalledTimes(1);
    expect(postsStore.initializePosts).toHaveBeenCalledWith(
      mockedPosts.slice(0, 5)
    );
    await wrapper.vm.$nextTick();

    const postCards = wrapper.findAllComponents(".post-card");

    expect(postCards).toHaveLength(5);
  });
});
