// src/pages/auth/AddCompanyPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCompanyData } from '../../types/company';

interface AddCompanyPageProps {
  onAddCompany: (companyData: CreateCompanyData) => void;
  onCancel: () => void;
}

const AddCompanyPage: React.FC<AddCompanyPageProps> = ({ onAddCompany }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateCompanyData>({
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.name.trim()) {
        setError("Le nom de l'entreprise est requis");
        setIsLoading(false);
        return;
      }

      // Simulation d’appel API ou callback réel
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAddCompany(formData);

      // Redirection vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'entreprise:", err);
      setError("Erreur lors de l'ajout de l'entreprise");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ajouter une nouvelle entreprise
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Restaurant Le Palmier"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              required
            />
          </div>

          {/* Erreur */}
          {error && (
            <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {error}
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {isLoading ? 'Ajout en cours...' : "Ajouter l'entreprise"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyPage;
