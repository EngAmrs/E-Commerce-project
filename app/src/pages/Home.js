import PageContent from '../Components/UI/PageContent'

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing products!</p>
    </PageContent>
  );
}

export default HomePage;

export async function action({request}) {
  const data = await request.formData();
  
}