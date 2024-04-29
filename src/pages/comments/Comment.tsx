import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getComment,
  createComment,
  deleteCommentService,
  updateCommentService,
} from "@/services/commentService";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

export default function CommentSection() {
  interface Comment {
    _id: string;
    user: string;
    document?: string;
    content: string;
    createdAt: Date;
    userName?: string;
  }
  const { id } = useParams();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedCommentContent, setUpdatedCommentContent] = useState("");
  useEffect(() => {
    socket.on("newComment", () => {
      fetchComments();
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<{ id: string }>(token);
      setUserId(decodedToken.id);
    }
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const comments = await getComment(id || "");
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const updateComment = async (id: string, content: string) => {
    try {
      await updateCommentService(id, { content });
      fetchComments();
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setEditingCommentId(null);
      setUpdatedCommentContent("");
    }
  };
  const deleteComment = async (id: string) => {
    try {
      await deleteCommentService(id);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createComment({
        content: newComment,
        user: userId,
        document: id,
      });

      setNewComment("");

      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="  bg-slate-300 px-14 flex items-center gap-2">
          {/* <img
            src="/assets/comments.png"
            alt="Robot Icon"
            className="w-6 h-6"
          /> */}
          <span>Comments</span>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[500px]">
        <DialogHeader>
          <DialogTitle> Add new Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-4">
            <form className="grid gap-4" onSubmit={handleCommentSubmit}>
              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  className="min-h-[100px]"
                  id="comment"
                  placeholder="Write your comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-medium">Recent Comments</h3>
            <div className="grid gap-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex items-start gap-4">
                  <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        {comment.user.firstName}
                      </div>
                      <div className="text-gray-500 text-xs dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {editingCommentId === comment._id ? (
                      <>
                        <Textarea
                          className="min-h-[100px]"
                          value={updatedCommentContent}
                          onChange={(e) =>
                            setUpdatedCommentContent(e.target.value)
                          }
                        />

                        <Button
                          onClick={() =>
                            updateComment(
                              comment._id,
                              String(updatedCommentContent)
                            )
                          }>
                          Save
                        </Button>

                        <Button onClick={() => setEditingCommentId(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div>{comment.content}</div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setUpdatedCommentContent(comment.content);
                              setEditingCommentId(comment._id);
                            }}>
                            Update
                          </Button>
                          <Button onClick={() => deleteComment(comment._id)}>
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
