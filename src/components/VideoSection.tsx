import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download as DownloadIcon } from "lucide-react";
import axios from "axios";

function getYouTubeID(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export function VideoSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/search/youtube?q=${encodeURIComponent(searchTerm)}`);
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredVideos = videos.filter(video =>
    selectedSubject === "all" || video.subject === selectedSubject
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-3 border rounded-md"
        />
        <Button onClick={handleSearch}>Search</Button>
        <div className="flex gap-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Videos */}
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <TabsTrigger value="featured">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="space-y-4">
          {loading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video: any, idx: number) => {
                const videoId = getYouTubeID(video.url || video.link);
                const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
                return (
                  <Card key={idx} className="overflow-hidden">
                    <img src={thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <CardHeader className="pb-2">
                      <CardTitle>{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                      <div className="flex justify-between items-center mt-2">
                        <Badge>{video.subject || "General"}</Badge>
                        <Button size="sm" onClick={() => window.open(video.url || video.link, "_blank")}>
                          Watch
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
