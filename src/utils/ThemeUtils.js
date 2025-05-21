import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    sidebar: {
        root: {
            inner: "h-full overflow-y-auto overflow-x-hidden rounded-none bg-violet-700",
        },
        collapse: {
            button:
                "group flex w-full items-center rounded p-2 text-base font-normal text-white transition duration-75 hover:bg-violet-600 dark:text-white dark:hover:bg-violet-500",
            icon: {
                base: "text-white transition duration-75 group-hover:text-white group-focus:text-white dark:text-white dark:group-hover:text-white dark:group-focus:text-white"
            }
        },
        item: {
            base:
                "flex items-center justify-center rounded p-2 text-base font-normal text-white hover:bg-violet-600 dark:text-white dark:hover:bg-violet-500",
            active:
                "bg-violet-600 dark:bg-violet-500 ",
            icon: {
                base:
                    "h-6 w-6 shrink-0 text-white  transition duration-75 group-hover:text-white dark:text-violet-200 dark:group-hover:text-white",
            },
        },
        itemGroup: {
            base:
                "mt-4 space-y-2 border-t border-violet-500 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-violet-400",
        },

    },


});
