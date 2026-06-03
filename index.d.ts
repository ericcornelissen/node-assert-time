// SPDX-License-Identifier: MIT

type AsyncFut = () => Promise<unknown>;
type SyncFut = () => unknown;

type Callback = (duration: number) => void;

export function assertTime(fut: AsyncFut, deadline: number): Promise<number>;
export function assertTime(fut: AsyncFut, deadline: number, onSlow: Callback, onTime: Callback?): void;

export function assertTime(fut: SyncFut, deadline: number): number;
export function assertTime(fut: SyncFut, deadline: number, onSlow: Callback, onTime: Callback?): void;
