import { useState, useEffect } from "react";

const parseList = v => v.split(",").map(s => s.trim()).filter(Boolean);

export default function FiltersPanel(props) {
  const [regions, setRegions] = useState(props.regions || []);
  const [genders, setGenders] = useState(props.genders || []);
  const [productCategories, setProductCategories] = useState(props.productCategories || []);
  const [tags, setTags] = useState(props.tags || []);
  const [paymentMethods, setPaymentMethods] = useState(props.paymentMethods || []);
  const [customerTypes, setCustomerTypes] = useState(props.customerTypes || []);
  const [ageMin, setAgeMin] = useState(props.ageMin || "");
  const [ageMax, setAgeMax] = useState(props.ageMax || "");
  const [dateFrom, setDateFrom] = useState(props.dateFrom || "");
  const [dateTo, setDateTo] = useState(props.dateTo || "");

  useEffect(() => {
    props.onChange({
      regions,
      genders,
      productCategories,
      tags,
      paymentMethods,
      customerTypes,
      ageMin,
      ageMax,
      dateFrom,
      dateTo,
    });
  }, [
    regions,
    genders,
    productCategories,
    tags,
    paymentMethods,
    customerTypes,
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
  ]);

  return (
    <>
      <div className="sidebar-group">
        <div className="sidebar-label">Regions</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="East,West"
          defaultValue={regions.join(",")}
          onBlur={e => setRegions(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Genders</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="Male,Female"
          defaultValue={genders.join(",")}
          onBlur={e => setGenders(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Product categories</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="Beauty,Electronics"
          defaultValue={productCategories.join(",")}
          onBlur={e => setProductCategories(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Tags</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="organic,skincare"
          defaultValue={tags.join(",")}
          onBlur={e => setTags(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Payment methods</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="UPI,Card"
          defaultValue={paymentMethods.join(",")}
          onBlur={e => setPaymentMethods(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Customer types</div>
        <input
          className="sidebar-chip-input"
          type="text"
          placeholder="New,Returning"
          defaultValue={customerTypes.join(",")}
          onBlur={e => setCustomerTypes(parseList(e.target.value))}
        />
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Age range</div>
        <div className="sidebar-range-row">
          <input
            className="sidebar-input"
            type="number"
            placeholder="Min"
            value={ageMin}
            onChange={e => setAgeMin(e.target.value)}
          />
          <input
            className="sidebar-input"
            type="number"
            placeholder="Max"
            value={ageMax}
            onChange={e => setAgeMax(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-label">Date range</div>
        <div className="sidebar-range-row">
          <input
            className="sidebar-input"
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
          <input
            className="sidebar-input"
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
