"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RichTextEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("richTextContent", content);
  }, [content]);

  const editorAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  return (
    <div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Rich Text Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactQuill
            value={content}
            onChange={setContent}
            className=""
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }], 
              ],
            }}
            theme="snow"
            style={{ height: "150px" }}
          />
          <div className="flex gap-2 mt-16">
            <Button
              type="button"
              variant="outline"
              onClick={() => setContent("")}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
