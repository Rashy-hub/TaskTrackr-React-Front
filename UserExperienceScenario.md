# **User Experience Story for TaskTrackr**

## **Bob Wants to Grow in Life**

While searching for a personal development app, Bob discovers **TaskTrackr**, an innovative solution that combines **Pomodoro techniques** and **to-do lists**. It also offers cutting-edge features like **GPT-powered AI**, which generates tailored **statistics** on his tasks (categorized by predefined topics) and the time spent on them (Pomodoro stats).

## **A Simple and Guided Application**

Bob is looking for an intuitive, opinionated app that streamlines his task management journey while staying simple to use.

---

## **Discovery and Registration**

-   On the **landing page**, Bob is drawn to the **7-day free trial** linked to his email address.
-   After registering and logging in, he lands on a **beautiful, interactive dashboard** with **animated cards** that he can easily **drag and drop** to organize his tasks.

---

## **Dashboard and Initial Organization**

-   By default, Bob sees **7 pre-defined cards**, representing common task categories:
    -   **Interpersonal**
    -   **Learning**
    -   **Review**
    -   **Chores**
    -   **Sports**
    -   **Work**
    -   **Social Duties**
-   Each card is color-coded based on Bob's preferences, which he can customize at any time.
-   Bob can perform **CRUD operations** (Create, Read, Update, Delete) on the cards and assign a **global status**:
    -   **IN PROGRESS**
    -   **STANDBY**
    -   **DONE**
    -   **ARCHIVED** (an alternative to "DONE" but more prominently visible in the card list).

---

## **Navigating Between Categories**

-   Clicking on a card triggers an animation before seamlessly redirecting Bob to the **to-do list** for that specific category.

---

## **Task Management**

-   In each category, Bob accesses a **configurable, paginated to-do list table**.
-   Each task includes:
    -   **Status**:
        -   IN PROGRESS
        -   STANDBY
        -   DONE
        -   ARCHIVED
    -   **Creation Date**
    -   **Estimated Completion Date** (default: one day after creation).
-   If all tasks within a card reach the "DONE" status, the parent card's global status is also updated to "DONE".
-   Bob can freely **add, edit, or delete** tasks whenever needed.

---

## **Advanced Features**

1. **Pomodoro Integration**:

    - Bob can start a **Pomodoro session** directly from a task via a dedicated button in the "Actions" column.
    - A **modal window** opens to track the session in real-time.
    - All session data is saved and sent to the backend for generating **detailed statistics**.

2. **Intelligent Notifications**:

    - Using **Toastify**, the integrated **GPT-2 AI** analyzes Bob’s task patterns and provides **smart suggestions** when he adds new tasks. These appear as helpful, non-intrusive notifications.

3. **Goal Tracking and Reports** _(New Feature)_:

    - Bob can set **monthly goals** for each category and track his progress.
    - The app generates **weekly and monthly reports**, showing insights like time spent, completion rates, and recommendations to improve productivity.

4. **Collaboration Mode** _(New Feature)_:

    - Bob can invite collaborators to specific cards or tasks, allowing them to contribute or leave comments.
    - Ideal for team projects or shared responsibilities.

5. **Recurring Tasks** _(New Feature)_:
    - Bob can create recurring tasks with customizable intervals (daily, weekly, monthly) to save time on repetitive planning.

---

## **Customization and Logout**

-   Bob can toggle between **light and dark modes** for better usability.
-   He can log out securely at any time.

---

With **TaskTrackr**, Bob enjoys a powerful yet simple tool to structure his life, boost productivity, and monitor progress, all within a seamless and delightful user experience.
