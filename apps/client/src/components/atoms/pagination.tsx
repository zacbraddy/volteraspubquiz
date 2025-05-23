"use client";
import { forwardRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import * as StyledPagination from "./styled/pagination";
import { Button } from "./button";
import { IconButton } from "./icon-button";

type PaginationProps = StyledPagination.RootProps;

const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  return (
    <StyledPagination.Root ref={ref} {...props} page={props.page ?? 1}>
      <StyledPagination.PrevTrigger asChild>
        <IconButton aria-label="Next Page">
          <LuChevronLeft />
        </IconButton>
      </StyledPagination.PrevTrigger>
      <StyledPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === "page" ? (
              <StyledPagination.Item key={index} {...page} asChild>
                <Button
                  className={
                    page.value === (props.page ?? 1) ? "page-selected" : ""
                  }
                >
                  {page.value}
                </Button>
              </StyledPagination.Item>
            ) : (
              <StyledPagination.Ellipsis key={index} index={index}>
                &#8230;
              </StyledPagination.Ellipsis>
            ),
          )
        }
      </StyledPagination.Context>
      <StyledPagination.NextTrigger asChild>
        <IconButton aria-label="Next Page">
          <LuChevronRight />
        </IconButton>
      </StyledPagination.NextTrigger>
    </StyledPagination.Root>
  );
});

export { Pagination };
