import { CoverLetterFormContainer } from '@/components/forms/containers';
import { ProgressBannerContainer } from '@/components/banner/ProgressBanner';

type TEditLetterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditLetterPage = async ({ params }: TEditLetterPageProps) => {
  const { id } = await params;

  return (
    <>
      <CoverLetterFormContainer letterId={id} />
      <ProgressBannerContainer />
    </>
  );
};

export default EditLetterPage;
