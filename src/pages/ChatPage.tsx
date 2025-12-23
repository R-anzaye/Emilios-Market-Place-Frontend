import { useState } from "react";
import { ChevronLeft, Send, Image as ImageIcon, Flag, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockConversations, mockMessages, Message } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function ChatPage() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    mockConversations[0]?.id || null
  );
  const [messageInput, setMessageInput] = useState("");

  const currentConversation = mockConversations.find(
    (c) => c.id === selectedConversation
  );
  const messages = selectedConversation
    ? mockMessages[selectedConversation] || []
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // In a real app, this would send to the backend
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    setMessageInput("");
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "We'll review this conversation and take appropriate action.",
    });
  };

  // Mobile: Show conversation list or chat
  const [showChat, setShowChat] = useState(false);

  const ConversationList = () => (
    <div className="h-full border-r bg-background">
      <div className="border-b p-4">
        <h1 className="text-lg font-semibold">Messages</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        {mockConversations.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No conversations yet</p>
          </div>
        ) : (
          <div className="divide-y">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv.id);
                  setShowChat(true);
                }}
                className={cn(
                  "flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50",
                  selectedConversation === conv.id && "bg-muted"
                )}
              >
                {/* Listing Image */}
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={conv.listingImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium text-foreground">
                      {conv.otherUserName}
                    </p>
                    <span className="flex-shrink-0 text-xs text-muted-foreground">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {conv.listingTitle}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {conv.unreadCount > 0 && (
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  const ChatWindow = () => (
    <div className="flex h-full flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowChat(false)}
          className="md:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {currentConversation && (
          <>
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <img
                src={currentConversation.listingImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {currentConversation.otherUserName}
              </p>
              <Link
                to={`/listing/${currentConversation.listingId}`}
                className="truncate text-sm text-primary hover:underline"
              >
                {currentConversation.listingTitle}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReport}
              className="text-muted-foreground hover:text-destructive"
            >
              <Flag className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.isSystem ? (
                <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-promoted-muted p-3">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-warning" />
                  <p className="text-sm text-promoted-foreground">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex",
                    message.senderId === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      message.senderId === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={cn(
                        "mt-1 text-[10px]",
                        message.senderId === "me"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t p-4"
      >
        <Button type="button" variant="ghost" size="icon">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );

  return (
    <Layout showFooter={false}>
      {/* Desktop Layout */}
      <div className="hidden h-[calc(100vh-64px)] md:grid md:grid-cols-3">
        <div className="col-span-1">
          <ConversationList />
        </div>
        <div className="col-span-2">
          {selectedConversation ? (
            <ChatWindow />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="h-[calc(100vh-120px)] md:hidden">
        {showChat && selectedConversation ? (
          <ChatWindow />
        ) : (
          <ConversationList />
        )}
      </div>
    </Layout>
  );
}
