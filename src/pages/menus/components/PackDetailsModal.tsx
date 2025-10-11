// src/pages/menus/components/PackDetailsModal.tsx
import React, { useEffect, useState } from 'react';
import { Menu } from '../../../types/menu';
import { menuService } from '../../../services/api/menuService';
import { colors } from '../../../config/colors';

interface PackDetailsModalProps {
  packId: number;
  onClose: () => void;
}

const PackDetailsModal: React.FC<PackDetailsModalProps> = ({ packId, onClose }) => {
  const [packDetails, setPackDetails] = useState<Menu | null>(null);
  const [menuDetails, setMenuDetails] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPackDetails();
  }, [packId]);

  const loadPackDetails = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await menuService.getPackDetails(packId);

      if (response.data) {
        setPackDetails(response.data);
        // Les détails des menus du pack devraient être dans response.data.menus
        // Si c'est un tableau d'IDs, il faudrait charger les détails de chaque menu
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des détails:', err);
      setError('Erreur lors du chargement des détails du pack');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            Détails du Pack
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {error}
              </p>
            </div>
          ) : packDetails ? (
            <div className="space-y-6">
              {/* Image et infos principales */}
              <div className="flex gap-4">
                {packDetails.image && (
                  <img 
                    src={`http://146.190.129.166:8000/${packDetails.image}`}
                    alt={packDetails.nom}
                    className="w-32 h-32 rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/default-menu.png';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                    {packDetails.nom}
                  </h3>
                  <p className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.primary }}>
                    {packDetails.prix} FCFA
                  </p>
                  {packDetails.description && (
                    <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {packDetails.description}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      packDetails.status === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {packDetails.status === 1 ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Liste des menus du pack */}
              {packDetails.menus && packDetails.menus.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                    Menus inclus dans ce pack ({packDetails.menus.length})
                  </h4>
                  <div className="space-y-2">
                    {packDetails.menus.map((menuId, index) => (
                      <div key={menuId} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Menu ID: {menuId}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Note: Les détails complets de chaque menu nécessiteraient des appels API supplémentaires.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Aucune donnée disponible
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackDetailsModal;