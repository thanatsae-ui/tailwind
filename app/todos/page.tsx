"use client";

import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { Button } from "@/components/tailgrids/core/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";

import { Check, ClockThree, Plus, Trash1 } from "@tailgrids/icons";
import { Badge } from "@/components/tailgrids/core/badge";

import { fetchTodos, TodoType } from "@/app/data/todos";

// ปุ่มเล็กสไตล์ชมพูดำ: มุมคม ขอบ 2px เงาแข็ง กดแล้วยุบ
const chipBtn =
  "h-8 px-2 flex items-center gap-2 rounded-none border-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#000] transition-all duration-75 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

//states
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [totalPages, settotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDialogOpen, setshowDialogOpen] = useState(false);

  // localStorage
  useEffect(() => {
    const _todoRawStr = localStorage.getItem("todosRaw");
    if (_todoRawStr === null) {
      fetchTodos()
        .then((data) => setTodosRaw(data as TodoType[]))
        .catch((error) => setTodosRaw([]))
        .finally(() => setIsLoading(false));
    } else {
      setTodosRaw(JSON.parse(_todoRawStr));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("todosRaw", JSON.stringify(todosRaw));
  }, [todosRaw]);

  //todosRaw => [] => todos
  useEffect(() => {
    showOnlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);
  }, [todosRaw, showOnlyWaiting]);

  // itemsPerPage => [] => totalPages
  useEffect(() => {
    settotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [itemsPerPage, todos]);

  //totalPages => [] => currentPage
  useEffect(() => {
    if (totalPages > 0 && currentPage === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  //delete todo
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };
  //make todo done
  const makeDone = (id: number) => {
    const selected = todosRaw.find((todo) => todo.id === id);
    if (selected) {
      selected!.completed = true;
      setTodosRaw([...todosRaw]);
    }
  };
  //add todo
  const addTodo = () => {
    console.log("add todo.......");
    const titleDom = document.getElementById("title") as HTMLInputElement;
    const newId = todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1;

    // validate
    const titleStr = titleDom.value.trim();
    if (titleStr === "") return;

    const newTodo: TodoType = {
      userId: 1,
      id: newId,
      title: titleDom.value.trim(),
      completed: false,
    };
    setTodosRaw([...todosRaw, newTodo]);
  };

  return (
    <>
      {/* todos container: กล่องดำมุมคม ขอบชมพู เงาแข็ง */}
      <div className="mx-auto mt-6 max-w-3xl px-2">
        <div className="border-2 border-pink-500 bg-black p-4 shadow-[8px_8px_0_0_#ec4899] md:p-6">
          {/* หัวกล่อง */}
          <div className="mb-4 flex items-center justify-between font-mono text-[0.7rem] tracking-[0.3em] text-pink-500">
            <span>// TODO.LIST</span>
            <span className="text-pink-300">{todosRaw.length} ITEMS</span>
          </div>

          {/* control */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* toggle */}
            <div className="flex items-center gap-2 text-pink-100">
              <Toggle
                label="Show only "
                checked={showOnlyWaiting}
                onChange={(e) => setShowOnlyWaiting(e.target.checked)}
              />
              <span className={`${chipBtn} pointer-events-none border-pink-500 bg-black text-pink-400 shadow-none`}>
                Waiting
                <ClockThree />
              </span>
            </div>
            {/* dropdown */}
            <div className="w-full sm:w-2/5">
              <NativeSelect
                className="rounded-none border-2 border-pink-500 bg-zinc-900 font-mono text-pink-200"
                value={itemsPerPage}
                onChange={(e) => setitemsPerPage(Number(e.target.value))}
              >
                <NativeSelectOption value={5}>5 items per page</NativeSelectOption>
                <NativeSelectOption value={10}>10 items per page</NativeSelectOption>
                <NativeSelectOption value={50}>50 items per page</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>

          {/* table */}
          <div className="mt-5 overflow-hidden border-2 border-pink-500/60">
            <TableRoot className="bg-zinc-950">
              <TableHeader>
                <TableRow className="border-b-2 border-pink-500 bg-pink-500 hover:bg-pink-500">
                  <TableHead className="w-24 text-center font-mono font-black text-black">ID</TableHead>
                  <TableHead className="font-mono font-black uppercase text-black">Title</TableHead>
                  <TableHead></TableHead>
                  <TableHead className="flex items-center justify-end gap-2 font-mono font-black uppercase text-black">
                    Completed
                    <button
                      className={`${chipBtn} border-black bg-black px-1.5 text-pink-400 shadow-[2px_2px_0_0_#fbcfe8] hover:bg-zinc-800`}
                      onClick={() => setshowDialogOpen(true)}
                    >
                      <Plus />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* show spinner while loading */}
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Spinner className="mx-auto text-pink-500" />
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && todos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <p className="text-center font-mono text-sm text-pink-400">
                        // No data, may be connection refused ( reload again )
                      </p>
                    </TableCell>
                  </TableRow>
                )}

                {/* render data */}
                {todos
                  .filter((todo, index) => {
                    const lower = (currentPage - 1) * itemsPerPage;
                    const upper = currentPage * itemsPerPage - 1;
                    return index >= lower && index <= upper;
                  })
                  .map((todo) => {
                    return (
                      <TableRow
                        key={todo.id}
                        className="border-b border-dashed border-zinc-800 bg-zinc-950 hover:bg-zinc-900"
                      >
                        <TableCell className="text-center">
                          <Badge
                            size={"lg"}
                            className="rounded-none border-2 border-pink-500 bg-black font-mono font-bold text-pink-400"
                          >
                            {String(todo.id).padStart(2, "0")}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={
                            todo.completed
                              ? "text-zinc-500 line-through decoration-pink-500"
                              : "text-pink-50"
                          }
                        >
                          {todo.title}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mt-4 flex justify-end gap-2">
                          {todo.completed ? (
                            <span className={`${chipBtn} pointer-events-none border-black bg-pink-500 text-black shadow-none`}>
                              Done
                              <Check />
                            </span>
                          ) : (
                            <button
                              className={`${chipBtn} border-pink-500 bg-black text-pink-400 shadow-[2px_2px_0_0_#ec4899] hover:bg-pink-950`}
                              onClick={() => makeDone(todo.id)}
                            >
                              Waiting
                              <ClockThree />
                            </button>
                          )}

                          <button
                            className={`${chipBtn} border-zinc-600 bg-zinc-900 text-pink-300 shadow-[2px_2px_0_0_#3f3f46] hover:border-pink-500 hover:bg-pink-500 hover:text-black`}
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <Trash1 />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableRoot>
          </div>

          {/* pagination */}
          {todos.length > 0 && (
            <div className="mx-auto mt-5 flex items-center justify-center gap-2">
              <button
                className={`${chipBtn} border-pink-500 bg-black text-pink-400 shadow-[2px_2px_0_0_#ec4899] hover:bg-pink-950 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none`}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <div className="bg-white px-1">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                  sideLayout="icon"
                />
              </div>
              <button
                className={`${chipBtn} border-pink-500 bg-black text-pink-400 shadow-[2px_2px_0_0_#ec4899] hover:bg-pink-950 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none`}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>

      <Backdrop isOpen={showDialogOpen} onOpenChange={setshowDialogOpen}>
        <Dialog className="rounded-none border-2 border-pink-500 shadow-[8px_8px_0_0_#ec4899]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-mono text-2xl font-black uppercase">
              <Plus className="border-2 border-black bg-pink-500 p-1 text-black" size={32} /> New todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-mono text-xs font-bold uppercase tracking-widest">ID (Auto Generated)</Label>
                <Input
                  className="pointer-events-none w-full rounded-none border-2 border-zinc-300 bg-zinc-100 font-mono"
                  value={todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1}
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-mono text-xs font-bold uppercase tracking-widest">Title</Label>
                <Input
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full rounded-none border-2 border-black focus:border-pink-500"
                  autoFocus
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose
              appearance="outline"
              className="rounded-none border-2 border-black font-mono font-bold uppercase"
            >
              Cancel
            </DialogClose>
            <DialogClose
              className="rounded-none border-2 border-black bg-pink-500 font-mono font-bold uppercase text-black shadow-[3px_3px_0_0_#000] hover:bg-pink-400"
              onClick={() => addTodo()}
            >
              Add todo
            </DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  );
}