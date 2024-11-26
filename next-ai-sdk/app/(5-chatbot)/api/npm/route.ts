import { z } from "zod";

export async function GET(req: Request) {
  console.log(JSON.stringify(req, null, 2));
  const { searchParams } = new URL(req.url);
  const packageName = searchParams.get("packageName");

  const packageNameSchema = z.string().min(1, "Package name is required");

  const validationResult = packageNameSchema.safeParse(packageName);
  if (!validationResult.success) {
    return new Response(validationResult.error.errors[0].message, {
      status: 400,
    });
  }

  const response = await fetch(`https://registry.npmjs.org/${packageName}`);

  if (!response.ok) {
    return new Response("Package not found", { status: 404 });
  }

  const packageDetails = await response.json();
  const { name, description, version, author, license } = packageDetails;

  return new Response(
    JSON.stringify({
      name,
      description,
      version,
      author,
      license,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
