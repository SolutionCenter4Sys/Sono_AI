import { Plane } from 'lucide-react';

const MODALITY_LABEL = {
  'rural-teleconsult': 'Teleconsulta rural',
  'kit-shipping-remote': 'Kit em logística remota',
  'home-exam-international': 'Exame domiciliar internacional',
  'cross-border-care': 'Atendimento transfronteiriço',
};

/**
 * Chip discreto identificando que esta persona é atendida via parceria de
 * telemedicina. Aparece em PatientHomeScreen, DiagnosisScreen e
 * AcompanhamentoScreen quando `persona.telemedicine` está definido.
 *
 * Props:
 *  - telemedicine: { partnerInstitution, partnerCity, modality, ... }
 *  - geography:    { flag, countryName, city, distanceToSpecialistKm }
 *  - variant:      'compact' (default) | 'detailed'
 */
export default function TelemedicineBadge({ telemedicine, geography, variant = 'compact' }) {
  if (!telemedicine) return null;
  const modalityLabel = MODALITY_LABEL[telemedicine.modality] || 'Telemedicina';
  const km = geography?.distanceToSpecialistKm;
  const flag = geography?.flag ?? '🌐';
  const partner = telemedicine.partnerInstitution;

  if (variant === 'detailed') {
    return (
      <div className="flex items-start gap-3 rounded-card border border-menta/35 bg-menta/10 px-3.5 py-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-menta/20">
          <Plane size={14} className="text-menta" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-kicker text-menta">
            <span>{modalityLabel}</span>
            {km != null && <span className="text-baunilha/55">· {km.toLocaleString('pt-BR')} km do especialista</span>}
          </div>
          <p className="mt-0.5 text-[12.5px] font-semibold text-text-primary leading-snug">
            <span className="mr-1.5" aria-hidden>{flag}</span>
            {partner}
          </p>
          {telemedicine.shippingNotes && (
            <p className="mt-1 text-[11px] leading-snug text-baunilha/65">
              {telemedicine.shippingNotes}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-menta/30 bg-menta/12 px-2.5 py-1 text-[10.5px] font-semibold text-menta">
      <span className="text-[12px]" aria-hidden>{flag}</span>
      <span className="hidden sm:inline">{modalityLabel} · </span>
      <span className="truncate max-w-[180px]">{partner}</span>
      {km != null && <span className="text-menta/70 font-normal">· {km.toLocaleString('pt-BR')} km</span>}
    </span>
  );
}
