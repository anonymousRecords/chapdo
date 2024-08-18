"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputPhrase, setInputPhrase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const correctPhrase: string = "민세림은 개발 천재다";

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPhrase === correctPhrase) {
      setIsOpen(false);
      setErrorMessage("");
    } else {
      setErrorMessage("올바른 문구를 입력해주세요.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
            아래 문구를 입력해야
            <br />
            블로그 방문이 가능합니다.
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500">
            '{correctPhrase}'를 입력해주세요.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={inputPhrase}
              onChange={(e) => setInputPhrase(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="여기에 문구를 입력하세요"
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              확인
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
