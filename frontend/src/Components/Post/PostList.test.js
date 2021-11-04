import PostList from "./PostList";
import {act, render, screen} from "@testing-library/react";
import React from "react";

test('if data is being fetched, Loader component is visible', async () => {
    act(() => {
        render(<PostList/>);
    });
    expect(screen.getByRole('textbox', {name: 'Text'})).toBeVisible();
});
