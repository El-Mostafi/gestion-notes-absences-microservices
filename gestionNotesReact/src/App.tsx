import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, GraduationCap } from 'lucide-react';
import EtudiantList from './components/EtudiantList';
import EtudiantForm from './components/EtudiantForm';
import SearchBar from './components/SearchBar';
import ConfirmDialog from './components/ConfirmDialog';
import { useEtudiants } from './hooks/useEtudiants';
import { Etudiant, EtudiantResponse } from './services/etudiantService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { etudiants, isLoading, createEtudiant, updateEtudiant, deleteEtudiant } = useEtudiants();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState<EtudiantResponse | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredEtudiants = useMemo(() => {
    if (!searchTerm) return etudiants;
    const term = searchTerm.toLowerCase();
    return etudiants.filter(
      (e) =>
        e.nom.toLowerCase().includes(term) ||
        e.prenom.toLowerCase().includes(term)
    );
  }, [etudiants, searchTerm]);

  const handleAdd = () => {
    setSelectedEtudiant(null);
    setShowForm(true);
  };

  const handleEdit = (etudiant: EtudiantResponse) => {
    setSelectedEtudiant(etudiant);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteEtudiant.mutate(deleteConfirm, {
        onSuccess: () => {
          setDeleteConfirm(null);
        },
      });
    }
  };

  const handleSubmit = (data: Etudiant) => {
    if (selectedEtudiant) {
      updateEtudiant.mutate(
        { id: selectedEtudiant.id, data },
        {
          onSuccess: () => {
            setShowForm(false);
            setSelectedEtudiant(null);
          },
        }
      );
    } else {
      createEtudiant.mutate(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEtudiant(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestion des Étudiants
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredEtudiants.length} étudiant{filteredEtudiants.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={20} />
              Ajouter un étudiant
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <EtudiantList
          etudiants={filteredEtudiants}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {showForm && (
        <EtudiantForm
          etudiant={selectedEtudiant}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isSubmitting={createEtudiant.isPending || updateEtudiant.isPending}
        />
      )}

      {deleteConfirm !== null && (
        <ConfirmDialog
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          isProcessing={deleteEtudiant.isPending}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
