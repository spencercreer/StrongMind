import Container from "../../componentLibrary/Container";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col flex-grow bg-tan py-8 px-12">
      <Container className="flex flex-col flex-grow">
        <h2>404: Page not found</h2>
        <Link to="/" className="text-red hover:text-green">
          Take me home
        </Link>
      </Container>
    </div>
  );
}
