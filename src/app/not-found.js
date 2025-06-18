"use client";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center px-4">
        <div className="mb-4 d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="#FFE353"
            className="bi bi-exclamation-triangle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zm-.982 4.905a.905.905 0 1 1 1.81 0l-.35 3.5a.555.555 0 0 1-1.11 0l-.35-3.5zM8 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
        <h1 style={{ color: "#FFE353" }} className="display-4 fw-bold ">
          404
        </h1>
        <p className="fs-4 text-secondary mb-3">Page Not Found</p>
        <p className="mb-4 text-muted">
          Sorry, the page youre looking for doesnt exist or has been moved.
        </p>
        <Link
          style={{ backgroundColor: "#FFE353" }}
          href="/"
          className="btn  px-4 py-2"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
