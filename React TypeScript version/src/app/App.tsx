import "../../public/styles.css";
import { TasksProvider } from "./context";
import PageLayout from "../components/page-layout";
import { Logo } from "../components/logo";
import { AddTaskField } from "../components/add-task-field";
import { TaskWrapper } from "../components/task-wrapper";

export function App() {
  return (
    <PageLayout>
      <Logo />
      <TasksProvider>
        <AddTaskField />
        <TaskWrapper />
      </TasksProvider>
    </PageLayout>
  );
}
