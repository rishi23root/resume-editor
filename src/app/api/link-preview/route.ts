import cheerio from "cheerio";

const isYouTubeURL = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
};

const extractYouTubeVideoId = (url: string) => {
    const videoIdRegex =
        /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : "";
};


const fetchData = async (url: string) => {
    try {
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Credentials", "true");

        headers.append("GET", "POST");
        const response = await fetch(url as string, {
            method: "GET",
            headers: headers,
        });
        const data = await response.text();

        const isYouTubeVideo = isYouTubeURL(url);
        if (isYouTubeVideo) {
            const videoId = extractYouTubeVideoId(url);
            const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            return {
                videoId,
                videoThumbnail,
            }
        } else {
            const $ = cheerio.load(data);
            const title = $('title').text() || '';
            const description = $('meta[name="description"]').attr('content') || '';
            const image = $('meta[property="og:image"]').attr('content') || '';

            return { title, description, image };
        }
    } catch (error) {
        console.error(error);
        return {}
    }
};

export async function POST(request: Request) {
    const { url } = await request.json();
    const data = await fetchData(url);
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

