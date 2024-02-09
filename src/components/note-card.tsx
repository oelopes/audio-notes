export const NoteCard = () => (
  <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-cyan-400">
    <span className="text-sm font-medium text-slate-500">há 2 dias</span>

    <p className="text-sm leading-6 text-slate-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus necessitatibus, atque quibusdam, itaque porro quisquam recusandae, deleniti aperiam vitae ex eaque perspiciatis optio molestias. Consectetur excepturi hic iure ad tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus fugiat, inventore reprehenderit provident molestias ipsam illo iure velit quam earum numquam architecto, vitae repellat? Id fugit magni optio iure!</p>

    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
  </button>
)