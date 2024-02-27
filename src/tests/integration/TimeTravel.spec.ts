import { describe, it, expect, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ActionsList from "@/components/ActionsList.vue";
import { useActions } from "@/stores/actionsStore";
import PostsList from "@/components/PostsList.vue";
import { usePosts } from "@/stores/postsStore";

const mockedPosts = [
  { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
  { id: 2, userId: 2, title: "Post 2", body: "Body 2" },
  { id: 3, userId: 3, title: "Post 3", body: "Body 3" },
  { id: 4, userId: 4, title: "Post 4", body: "Body 4" },
  { id: 5, userId: 5, title: "Post 5", body: "Body 5" },
];

const firstSnapshot = [
  { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
  { id: 3, userId: 3, title: "Post 3", body: "Body 3" },
  { id: 2, userId: 2, title: "Post 2", body: "Body 2" },
  { id: 4, userId: 4, title: "Post 4", body: "Body 4" },
  { id: 5, userId: 5, title: "Post 5", body: "Body 5" },
];

const secondSnapshot = [
  { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
  { id: 3, userId: 3, title: "Post 3", body: "Body 3" },
  { id: 2, userId: 2, title: "Post 2", body: "Body 2" },
  { id: 5, userId: 5, title: "Post 5", body: "Body 5" },
  { id: 4, userId: 4, title: "Post 4", body: "Body 4" },
];

const thirdSnapshot = [
  { id: 3, userId: 3, title: "Post 3", body: "Body 3" },
  { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
  { id: 2, userId: 2, title: "Post 2", body: "Body 2" },
  { id: 5, userId: 5, title: "Post 5", body: "Body 5" },
  { id: 4, userId: 4, title: "Post 4", body: "Body 4" },
];

describe("TimeTravel", () => {
  let actionsListWrapper: VueWrapper;
  let postsListWrapper: VueWrapper;

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      stubActions: false,
    });

    actionsListWrapper = mount(ActionsList, {
      global: {
        plugins: [testingPinia],
      },
    });

    postsListWrapper = mount(PostsList, {
      global: {
        plugins: [testingPinia],
      },
    });
  });

  it("renders the posts and there are no actions", async () => {
    const postsStore = usePosts();
    postsStore.posts = JSON.parse(JSON.stringify(mockedPosts));

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    expect(postsListWrapper.findAllComponents(".post-card")).toHaveLength(5);
    expect(actionsListWrapper.text()).toContain("No actions commited yet");
  });

  it("when time travel is clicked, rewinds the order of the posts as it was before that action was taken", async () => {
    const actionsStore = useActions();
    const postsStore = usePosts();
    postsStore.posts = JSON.parse(JSON.stringify(mockedPosts));

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    //First iteration
    const postCard2 = postsListWrapper.find("#post-2");
    await postCard2.find(".chevron-down").trigger("click");

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    const actionCards = actionsListWrapper.findAllComponents(".action-card");
    expect(actionCards).toHaveLength(1);
    expect(actionsStore.actions).toHaveLength(1);
    expect(actionsStore.actions[0]).toEqual({
      postId: 2,
      from: 1,
      to: 2,
      snapshot: firstSnapshot,
    });

    //Second iteration
    const postCard4 = postsListWrapper.find("#post-4");
    await postCard4.find(".chevron-down").trigger("click");

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    const actionCardsSecondIteration =
      actionsListWrapper.findAllComponents(".action-card");
    expect(actionCardsSecondIteration).toHaveLength(2);
    expect(actionsStore.actions).toHaveLength(2);

    expect(actionsStore.actions[0]).toEqual({
      postId: 4,
      from: 3,
      to: 4,
      snapshot: secondSnapshot,
    });

    //Third iteration
    const postCard3 = postsListWrapper.find("#post-3");
    await postCard3.find(".chevron-up").trigger("click");

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    const actionCardsThirdIteration =
      actionsListWrapper.findAllComponents(".action-card");
    expect(actionCardsThirdIteration).toHaveLength(3);
    expect(actionsStore.actions).toHaveLength(3);

    expect(actionsStore.actions[0]).toEqual({
      postId: 3,
      from: 1,
      to: 0,
      snapshot: thirdSnapshot,
    });

    //Fires time travel
    const timeTravelButton = actionsListWrapper.findAllComponents(
      ".time-travel-button"
    )[1];

    await timeTravelButton.trigger("click");

    const actionCardsAfterTimeTravel =
      actionsListWrapper.findAllComponents(".action-card");
    expect(actionCardsAfterTimeTravel).toHaveLength(1);
    expect(actionsStore.actions).toHaveLength(1);

    expect(actionsStore.actions[0]).toEqual({
      postId: 2,
      from: 1,
      to: 2,
      snapshot: firstSnapshot,
    });

    expect(JSON.stringify(postsStore.posts)).toEqual(
      JSON.stringify(firstSnapshot)
    );
  });

  it("when a post is moved, an action is recorded", async () => {
    const actionsStore = useActions();
    const postsStore = usePosts();
    postsStore.posts = JSON.parse(JSON.stringify(mockedPosts));

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    const postCard2 = postsListWrapper.find("#post-2");
    await postCard2.find(".chevron-down").trigger("click");

    await postsListWrapper.vm.$nextTick();
    await actionsListWrapper.vm.$nextTick();

    const actionCards = actionsListWrapper.findAllComponents(".action-card");
    expect(actionCards).toHaveLength(1);
    expect(actionsStore.actions).toHaveLength(1);
    expect(actionsStore.actions[0]).toEqual({
      postId: 2,
      from: 1,
      to: 2,
      snapshot: firstSnapshot,
    });

    expect(JSON.stringify(postsStore.posts)).toEqual(
      JSON.stringify(firstSnapshot)
    );
  });
});
