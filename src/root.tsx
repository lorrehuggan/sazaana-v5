// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import Nav from "./components/nav";
import QueriesProvider from "./context/queries";
import TracklistProvider from "./context/tracklist";
import "./pre.css"
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <QueriesProvider>
              <TracklistProvider>
                <Nav />
                <main class="container">
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </main>
              </TracklistProvider>
            </QueriesProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
