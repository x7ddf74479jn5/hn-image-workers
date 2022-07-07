interface Env {
  X7DDF74479JN5_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/upload") {
      const formData = await request.formData();
      const imagedata = formData.get("imagedata");
      if (imagedata === null) {
        throw new Error("not found imagedata");
      }
      const file = imagedata as File;
      const obj = await env.X7DDF74479JN5_BUCKET.put("image", file, {
        httpMetadata: {
          contentType: "image/png",
        },
      });

      return new Response(`key: ${obj.key}!!`, {
        headers: { "content-type": "text/plain" },
      });
    }

    if (path === "/image") {
      const obj = await env.X7DDF74479JN5_BUCKET.get("image");
      if (obj === null) {
        throw new Error("upload してー");
      }
      return new Response(obj.body);
    }

    return new Response("Not found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  },
};
