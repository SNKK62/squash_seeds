import { repository } from "@registry/repository";
import { GetAllUniversitiesUsecase } from "@usecase/universities/getAllUniversities.usecase";

const getAllUniversitiesUsecase = new GetAllUniversitiesUsecase(repository);

export async function GET() {
  try {
    const universities = await getAllUniversitiesUsecase.execute();
    console.log(universities);
    return Response.json({ data: universities });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
