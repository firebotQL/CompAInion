import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

import { Message } from "ai";

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock: Components = {
  code: ({ inline, className, children }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={solarizedlight}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
      />
    ) : (
      <code className={className}>{children}</code>
    );
  },
};

interface ChatMessageProps {
  message: Message;
}

export const ChatBlob: FC<ChatMessageProps> = ({
  message,
}: ChatMessageProps) => {
  let colStyle = "items-start";
  let messageStyle = "bg-neutral-200 text-neutral-900";
  if (message.role === "user") {
    colStyle = "items-end";
    messageStyle = "bg-blue-500 text-white";
  }
  return (
    <div className={`flex flex-col ${colStyle}`}>
      <div
        className={`flex items-center ${messageStyle} rounded-2xl px-3 py-2 max-w-[90%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        <div>
          <ReactMarkdown components={CodeBlock} rehypePlugins={[rehypeRaw]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
