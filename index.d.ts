// SPDX-License-Identifier: MIT

type Asyncfut = () => Promise<unknown>;
type SyncFut = () => unknown;

type Callback = (duration: number) => void;

export function assertTime(fut: SyncFut, deadline: number): number;
export function assertTime(fut: Asyncfut, deadline: number): Promise<number>;
export function assertTime(fut: SyncFut, deadline: number, onSlow: Callback): void;
export function assertTime(fut: SyncFut, deadline: number, onSlow: Callback, onTime: Callback): void;
