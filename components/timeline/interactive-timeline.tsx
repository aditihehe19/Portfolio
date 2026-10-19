"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { initialTimelineItems, TimelineItem } from "@/config/timeline";

export default function InteractiveTimeline() {
  const [items, setItems] = useState<TimelineItem[]>(initialTimelineItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<TimelineItem["category"]>("Milestone");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Load persisted items from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aditi_timeline_items");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // fallback to initial
    }
  }, []);

  const saveItems = (updated: TimelineItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem("aditi_timeline_items", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newItem: TimelineItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      organization: organization.trim() || undefined,
      date: date.trim(),
      timestamp: Date.now(),
      category,
      description: description.trim(),
      tags: tags.length ? tags : [category],
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset Form
    setTitle("");
    setOrganization("");
    setDate("");
    setDescription("");
    setTagsInput("");
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  const handleReset = () => {
    if (confirm("Reset timeline to default entries?")) {
      saveItems(initialTimelineItems);
    }
  };

  const categories = ["All", "Education", "Experience", "Project", "Leadership", "Milestone"];

  const filteredItems = items.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Filter and Add Button Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/80 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className="flex-1 sm:flex-none items-center gap-1.5 rounded-full shadow-sm"
          >
            <Icons.add className="w-4 h-4" />
            <span>Add Timeline Event</span>
          </Button>

          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-destructive"
            title="Reset to default timeline"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-border/80 space-y-8 my-6">
        {filteredItems.map((item, index) => {
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:scale-125 group-hover:bg-primary transition-all duration-300">
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-6 rounded-xl border border-border/70 bg-background/90 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-bold text-foreground">
                      {item.title}
                    </h4>
                    {item.organization && (
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                        · {item.organization}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                      {item.date}
                    </span>
                    {item.id.startsWith("custom-") && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        title="Delete milestone"
                      >
                        <Icons.trash className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/50">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Form for Adding Timeline Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Icons.history className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Add New Timeline Milestone</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <Icons.close className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Milestone / Position Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cybersecurity Research Fellow"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Organization / Project
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SRM AP / Lab"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Date / Timeframe *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. April 2026 – Present"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Education">Education</option>
                  <option value="Experience">Experience</option>
                  <option value="Project">Project</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Milestone">Milestone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your achievement, responsibilities, or technical outcomes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cryptography, Python, Research"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save to Timeline
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
