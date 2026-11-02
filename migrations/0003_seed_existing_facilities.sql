CREATE UNIQUE INDEX IF NOT EXISTS idx_healthcare_facility_name_unique ON healthcare_facilities (lower(name));

INSERT INTO healthcare_facilities (name, facility_type, municipality, address, verification_status)
VALUES
('Davao del Sur Provincial Hospital','Hospital','Digos','Lapu-Lapu Street, Zone III, Digos City, Davao del Sur','PENDING'),
('Digos Doctors'' Hospital, Inc.','Hospital','Digos','McArthur Highway, Kiagot, Digos City, Davao del Sur','PENDING'),
('Medical Center of Digos Cooperative Hospital (MCDC)','Hospital','Digos','National Highway, Tres de Mayo, Digos City, Davao del Sur','PENDING'),
('Sunga Hospital, Inc.','Hospital','Digos','3991 Rizal Avenue, Zone III, Digos City, Davao del Sur','PENDING'),
('Gonzales-Maranan Medical Center, Inc.','Hospital','Digos','Quezon Avenue, Digos City, Davao del Sur','PENDING'),
('Dominican Hospital (St. Dominic Hospital of Digos)','Hospital','Digos','Quezon Avenue, Zone 1, Digos City, Davao del Sur','PENDING'),
('Alfonso G. Llanos Medical Clinic & Hospital','Hospital / medical clinic','Digos','Rizal Avenue, Digos City, Davao del Sur','PENDING'),
('Gonzales-Maranan Medical Center – Guihing Satellite','Hospital satellite','Hagonoy','Campo 10, Guihing, Hagonoy, Davao del Sur','PENDING'),
('Bendijo Hospital / Clinica Rudinas and Hospital','Hospital / clinic','Hagonoy','Hagonoy, Davao del Sur','PENDING'),
('Viacrucis Medical Hospital','Hospital','Bansalan','Bansalan, Davao del Sur','PENDING'),
('Centeno Medical Specialists Hospital, Inc.','Hospital','Bansalan','R. delos Cientos Street, Poblacion Uno, Bansalan, Davao del Sur','PENDING'),
('Mabama Doctors'' Hospital','Hospital','Bansalan','Bonifacio Road, Poblacion 2, Bansalan, Davao del Sur','PENDING'),
('MedCORE Hospital, Inc.','Hospital','Santa Cruz','National Highway, Zone II, Santa Cruz, Davao del Sur','PENDING'),
('Marpe Medical Clinic & Hospital, Inc.','Hospital','Santa Cruz','Apo Beach, Zone III, Santa Cruz, Davao del Sur','PENDING'),
('Ralota-Lagrada Medical Clinic','Medical clinic','Santa Cruz','Santa Cruz, Davao del Sur','PENDING'),
('Sinawilan Clinic & Hospital','Hospital / clinic','Matanao','Matanao, Davao del Sur','PENDING'),
('Jose J. Golingay General Hospital, Inc.','Hospital','Malalag','Malalag, Davao del Sur','PENDING'),
('Pineda-Aquino General Hospital','Hospital','Malalag','Malalag, Davao del Sur','PENDING'),
('Saroma Hospital','Hospital','Malalag','Poblacion, Malalag, Davao del Sur','PENDING'),
('Asilo Hospital','Hospital','Padada','Padada, Davao del Sur','PENDING'),
('South Davao Medical Specialists'' Hospital, Inc.','Hospital','Padada','Purok 4, Southern Paligue, Padada, Davao del Sur','PENDING'),
('Baron-Yee Hospital','Hospital','Padada','Magsaysay Street, Poblacion, Padada, Davao del Sur','PENDING'),
('Gregorio Matas District Hospital','Hospital','Kiblawan','Bucabal Street, Poblacion, Kiblawan, Davao del Sur','PENDING'),
('Diones Hospital','Infirmary / dispensary','Sulop','Purok 4, Poblacion, Sulop, Davao del Sur','PENDING'),
('Sulop Medical Clinic','Infirmary / dispensary','Sulop','Purok 2, Poblacion, Sulop, Davao del Sur','PENDING'),
('Sulop Municipal Health Building','Municipal health facility','Sulop','Sulop, Davao del Sur','PENDING'),
('Magsaysay Medical Healthcare, Inc.','Infirmary / dispensary','Magsaysay','Purok 5, Barayong, Magsaysay, Davao del Sur','PENDING')
ON CONFLICT DO NOTHING;