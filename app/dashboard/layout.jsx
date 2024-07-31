export default function layout({ children }) {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto bg-slate-100 lg:px-6 px-4">
      {children}
    </div>
  );
}
