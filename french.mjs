// French learner-facing messages. Keep English keys aligned with spanish.mjs.
export const frenchMessages = [
  ["Strand {0}","Fibre {0}"],
  ["Test point","Point de test"],
  ["Steps, tools and result meanings","Étapes, outils et interprétation"],
  ["Exact component not yet confirmed.","Le composant exact reste à confirmer."],
  ["Tell service light from a tracing tool.","Distinguer la lumière de service d’un outil de traçage."],
  ["Which source carries the device’s data?","Quelle source transporte les données de l’appareil ?"],
  ["The optic carries data as infrared light. The VFL supplies separate red light to trace an isolated fiber.","Le module optique transporte les données sous forme de lumière infrarouge. Le VFL fournit une lumière rouge distincte pour tracer une fibre isolée."],
  ["Follow the connected parts without treating a passive as a light source.","Suivre les éléments raccordés sans prendre un passif pour une source lumineuse."],
  ["Does a CAS create light to send onward?","Un CAS produit-il de la lumière pour la transmettre plus loin ?"],
  ["No. It connects the mapped fiber path. The optic or VFL supplies the light.","Non. Il relie le chemin de fibre attribué. Le module optique ou le VFL fournit la lumière."],
  ["Follow data through both optics and the fiber between them.","Suivre les données à travers les deux modules optiques et la fibre qui les relie."],
  ["Where does incoming light become device data again?","Où la lumière reçue redevient-elle des données pour l’appareil ?"],
  ["At the receiving optic. Fiber and passive connections carry light between the optics.","Dans le module optique récepteur. La fibre et les connexions passives transportent la lumière entre les modules."],
  ["Follow every connection between the two devices.","Suivre chaque connexion entre les deux appareils."],
  ["Can you skip an intermediate passive when checking the route?","Peut-on ignorer un passif intermédiaire lors de la vérification du chemin ?"],
  ["No. Follow the mapped route through every passive and connection; each is part of the path.","Non. Suivez le chemin attribué à travers chaque passif et chaque connexion ; tous font partie du trajet."],
  ["Keep TX and RX roles clear when changing ends.","Garder les rôles de TX et RX clairs en changeant d’extrémité."],
  ["At Device B, whose TX supplies B’s RX?","Sur l’appareil B, quel TX alimente le RX de B ?"],
  ["Device A’s TX supplies B’s RX through the mapped path. Changing viewpoint does not change that physical direction.","Le TX de l’appareil A alimente le RX de B par le chemin attribué. Changer de point de vue ne change pas cette direction physique."],
  ["Recognize separate followers within one MMC assembly.","Reconnaître les branches distinctes d’un même ensemble MMC."],
  ["Does one working follower prove all followers work?","Une branche qui fonctionne prouve-t-elle que toutes fonctionnent ?"],
  ["No. Each follower has its own mapped fibers. Check the assigned follower, head and destination.","Non. Chaque branche possède ses propres fibres attribuées. Vérifiez la branche, la tête et la destination prévues."],
  ["Use each part of the location to find the intended device.","Utiliser chaque élément de l’emplacement pour trouver l’appareil prévu."],
  ["Does a rack location identify the correct fiber connection by itself?","L’emplacement dans le rack suffit-il à identifier la bonne connexion fibre ?"],
  ["No. The location gets you to the device; FIM and the physical labels identify its assigned connections.","Non. L’emplacement mène à l’appareil ; FIM et les étiquettes physiques identifient les connexions qui lui sont attribuées."],
  ["Distinguish the physical location from the connection assignment.","Distinguer l’emplacement physique de l’attribution de connexion."],
  ["After finding the device, what must you match?","Après avoir trouvé l’appareil, quels éléments faut-il faire correspondre ?"],
  ["Match the device, optic socket, LC follower, MMC head and CAS port to the connection record.","Faites correspondre l’appareil, le logement optique, la branche LC, la tête MMC et le port CAS avec la fiche de connexion."],
  ["Follow one assignment from its LC leg to the mapped CAS port.","Suivre une attribution de sa branche LC jusqu’au port CAS indiqué."],
  ["What should you do when the observed port differs from FIM?","Que faire lorsque le port observé ne correspond pas à FIM ?"],
  ["Compare the physical labels, patching and record before correcting anything. A mismatch is not proof of a failed optic.","Comparez les étiquettes physiques, le brassage et la fiche avant toute correction. Un écart ne prouve pas une panne du module optique."],
  ["Use the installed orientation and labels to choose the LC position.","Utiliser l’orientation installée et les étiquettes pour choisir la position LC."],
  ["If the optic is flipped, does the identifier 5/1 become 5/5?","Si le module optique est retourné, l’identifiant 5/1 devient-il 5/5 ?"],
  ["No. The displayed side changes, but the identifier and assigned connection stay the same.","Non. Le côté affiché change, mais l’identifiant et la connexion attribuée restent les mêmes."],
  ["Trace the assigned LC leg to its MMC head and passive.","Tracer la branche LC attribuée jusqu’à sa tête MMC et son passif."],
  ["Is a nearby cable enough to identify the right route?","Un câble proche suffit-il à identifier le bon chemin ?"],
  ["No. Follow the assigned leg and confirm its head and mapped port. Physical proximity does not establish identity.","Non. Suivez la branche attribuée et confirmez sa tête et son port prévu. La proximité physique ne suffit pas à établir l’identité."],
  ["Combine location, orientation and mapping before patching.","Combiner emplacement, orientation et attribution avant le brassage."],
  ["What should agree before seating the connector?","Quels éléments doivent correspondre avant d’insérer le connecteur ?"],
  ["The device location, optic position, follower, head and destination port should match the assignment.","L’emplacement de l’appareil, la position optique, la branche, la tête et le port de destination doivent correspondre à l’attribution."],
  ["Use the reported neighbor to check endpoint identity.","Utiliser le voisin signalé pour vérifier l’identité de l’extrémité."],
  ["Does the correct LLDP neighbor prove healthy optical power?","Le bon voisin LLDP prouve-t-il que la puissance optique est correcte ?"],
  ["No. It supports endpoint identity. Check required optical readings and link operation separately.","Non. Il étaye l’identité de l’extrémité. Vérifiez séparément les relevés optiques requis et le fonctionnement de la liaison."],
  ["Compare every required reading with its installed optic’s limits.","Comparer chaque relevé requis aux limites du module optique installé."],
  ["Is −4.20 dBm acceptable when the minimum is −3.00 dBm?","−4.20 dBm est-il acceptable si le minimum est −3.00 dBm ?"],
  ["No. −4.20 is below the minimum. Use the installed limits; zero is not a required target.","Non. −4.20 est inférieur au minimum. Utilisez les limites du matériel installé ; zéro n’est pas une cible obligatoire."],
  ["Separate a pairing problem from a source that is not emitting.","Distinguer un problème d’appariement d’une source qui n’émet pas."],
  ["Can the wrong TX-to-RX pairing explain a transmitter that is not emitting?","Un mauvais appariement TX-RX explique-t-il un émetteur qui n’émet pas ?"],
  ["No. Pairing controls where light goes. Verify the source and its report separately when TX shows no light.","Non. L’appariement détermine où va la lumière. Vérifiez séparément la source et son relevé lorsque TX indique une absence de lumière."],
  ["Recognize several possible causes of the same dark-channel symptom.","Reconnaître plusieurs causes possibles d’un même canal sans lumière."],
  ["Does one dark strand identify a damaged ferrule?","Une seule fibre sans lumière permet-elle d’identifier une férule endommagée ?"],
  ["No. Mapping, seating, contamination, bends, fiber or splice defects can produce similar symptoms. More evidence is needed.","Non. L’attribution, l’insertion, la contamination, les courbures et les défauts de fibre ou d’épissure peuvent produire des symptômes similaires. Il faut davantage de preuves."],
  ["Check connection condition before judging a component.","Vérifier l’état de la connexion avant de juger un composant."],
  ["After cleaning a connector, what comes next?","Après avoir nettoyé un connecteur, quelle est la suite ?"],
  ["Inspect again, seat correctly, then retest and record the result. Cleaning alone does not prove recovery.","Inspectez à nouveau, insérez correctement, puis retestez et consignez le résultat. Le nettoyage seul ne prouve pas le rétablissement."],
  ["Trace the expected strand and destination on an isolated path.","Tracer la fibre et la destination attendues sur un chemin isolé."],
  ["Where does this site’s VFL attach?","Où se raccorde le VFL de ce site ?"],
  ["To a disconnected LC leg with the matching adapter. CAS/MMC connections are viewing points for this kit.","Sur une branche LC déconnectée, avec l’adaptateur adapté. Les connexions CAS/MMC servent de points d’observation pour ce kit."],
  ["Understand why visible continuity is only part of the evidence.","Comprendre pourquoi la continuité visible ne constitue qu’une partie des preuves."],
  ["Both strands pass VFL, but restored RX is below its limit. Is the case finished?","Les deux fibres passent le VFL, mais le RX rétabli est sous sa limite. Le cas est-il terminé ?"],
  ["No. Visible continuity does not prove acceptable service-wavelength loss. Investigate the low reading with appropriate loss testing.","Non. La continuité visible ne prouve pas une perte acceptable à la longueur d’onde de service. Examinez le relevé faible avec un test de perte adapté."],
  ["Choose a loop location for the question you need to answer.","Choisir l’emplacement du bouclage selon la question à résoudre."],
  ["What does an MMC loop add after a direct LC loop passes?","Qu’ajoute un bouclage MMC après la réussite d’un bouclage LC direct ?"],
  ["It adds the mapped outgoing and return fibers and connections up to the passive. The route beyond the loop and the remote optic remain untested.","Il ajoute les fibres aller et retour attribuées et les connexions jusqu’au passif. Le chemin au-delà du bouclage et le module optique distant restent non testés."],
  ["Compare the last passing loop with the first failing loop.","Comparer le dernier bouclage réussi au premier bouclage en échec."],
  ["CAS 1 passes and CAS 2 fails from the same optic. Where do you investigate?","CAS 1 réussit et CAS 2 échoue depuis le même module optique. Où chercher ?"],
  ["Verify the failed setup, then investigate the added section and its connections between CAS 1 and CAS 2. The exact bad part is still unknown.","Vérifiez le montage en échec, puis examinez la section ajoutée et ses connexions entre CAS 1 et CAS 2. Le composant défectueux exact reste inconnu."],
  ["Connect an individual change to fresh evidence.","Relier un changement individuel à de nouvelles preuves."],
  ["If you clean and repatch before retesting, can you tell which change helped?","Si vous nettoyez et modifiez le brassage avant de retester, pouvez-vous savoir quel changement a aidé ?"],
  ["No. Change one thing at a time and record a fresh result. Even an improved reading needs final service verification.","Non. Changez un seul élément à la fois et consignez un nouveau résultat. Même un relevé amélioré exige une vérification finale du service."],
  ["Combine evidence and verify recovery before closing the case.","Combiner les preuves et vérifier le rétablissement avant de clore le cas."],
  ["One RX reading improves into range. What still needs checking?","Un relevé RX s’améliore et revient dans la plage. Que reste-t-il à vérifier ?"],
  ["Check every required lane, link operation and the expected endpoint identity. Record the change and the final results.","Vérifiez tous les canaux requis, le fonctionnement de la liaison et l’identité attendue de l’extrémité. Consignez le changement et les résultats finaux."],
  ["Know the equipment","Connaître le matériel"],
  ["Recognize the parts and follow the light.","Reconnaître les éléments et suivre la lumière."],
  ["Identify the correct connection","Identifier la bonne connexion"],
  ["Find the device, match FIM and confirm the destination.","Trouver l’appareil, vérifier FIM et confirmer la destination."],
  ["Understand the readings","Comprendre les relevés"],
  ["Read limits, separate symptoms and keep causes open.","Lire les limites, distinguer les symptômes et garder les causes ouvertes."],
  ["Choose and use a test","Choisir et utiliser un test"],
  ["Know why, where and how to test—and what remains untested.","Savoir pourquoi, où et comment tester, et ce qui reste non testé."],
  ["Isolate and verify","Isoler et vérifier"],
  ["Narrow the section, retest changes and prove recovery.","Délimiter la section, retester les changements et prouver le rétablissement."],
  ["Try both data directions","Essayer les deux sens de données"],
  ["Practice LC & MMC patching","S’entraîner au brassage LC et MMC"],
  ["Compare LC and MMC loops","Comparer les bouclages LC et MMC"],
  ["Open troubleshooting","Ouvrir le dépannage"],
  ["Five stages, one lesson at a time. Learn the purpose, explore the example, then check your understanding.","Cinq étapes, une leçon à la fois. Comprenez l’objectif, explorez l’exemple, puis vérifiez votre compréhension."],
  ["Start stage {0}","Commencer l’étape {0}"],
  ["Stage {0} of {1}","Étape {0} sur {1}"],
  ["Lesson {0} of {1}","Leçon {0} sur {1}"],
  ["Lesson in this stage","Leçon de cette étape"],
  ["What you’ll learn","Ce que vous apprendrez"],
  ["Check your understanding","Vérifiez votre compréhension"],
  ["Show explanation","Afficher l’explication"],
  ["Put this stage into practice","Mettre cette étape en pratique"],
  ["Related exam","Examen associé"],
  ["Lesson navigation","Navigation entre les leçons"],
  ["Previous lesson","Leçon précédente"],
  ["Next lesson","Leçon suivante"],
  ["Choose an Intermediate exam","Choisir un examen intermédiaire"],
  ["References","Références"],
  ["From your lesson","Depuis votre leçon"],
  ["Follow the full route through rack, distribution and room-passage passives","Suivre le chemin complet à travers les passifs du rack, de distribution et de passage entre salles"],
  ["Review FIM, LC & MMC patching","Revoir FIM et le brassage LC et MMC"],
  ["Choose a level. Every exam has five questions and draws from the lessons.","Choisissez un niveau. Chaque examen comporte cinq questions tirées des leçons."],
  ["Explore the lessons","Explorer les leçons"],
  ["Use the same lesson knowledge in situations with several clues. Separate what is known from what still needs checking.","Appliquez les mêmes connaissances dans des situations avec plusieurs indices. Distinguez ce qui est connu de ce qui reste à vérifier."],
  ["VFL and LC reference connection","VFL et connexion LC de référence"],
  ["Not isolated yet","Pas encore isolé"],
  ["Do this next","À faire ensuite"],
  ["Keep this area unverified. Copy the findings and request the listed tools or access before continuing.","Cette zone reste non vérifiée. Copiez les constats et demandez les outils ou l’accès indiqués avant de continuer."],
  ["Restored service verified","Service rétabli et vérifié"],
  ["Finish the case","Terminer le dossier"],
  ["Confirm the path first","Confirmer d’abord le trajet"],
  ["Match the device and optic socket to FIM.","Vérifiez que l’équipement et l’emplacement optique correspondent à FIM."],
  ["Match the LC follower, MMC head serial, CAS ports and strand at the tested ends.","Vérifiez le brin LC, le numéro de série de la tête MMC, les ports CAS et la fibre aux extrémités testées."],
  ["Check only the identity boxes you have confirmed.","Cochez uniquement les identifiants que vous avez confirmés."],
  ["FIM record and readable hardware labels","Fiche FIM et étiquettes matérielles lisibles"],
  ["Continue with the next isolation check.","Poursuivez avec le contrôle d’isolement suivant."],
  ["Check the test source","Vérifier la source de test"],
  ["Keep the same VFL and LC attachment. Connect a compatible known-good reference lead.","Gardez le même VFL et raccordement LC. Connectez un cordon de référence compatible dont le bon fonctionnement est connu."],
  ["Use the approved light-detection method. Record whether the reference has light.","Utilisez la méthode approuvée de détection lumineuse. Notez si le cordon de référence transmet la lumière."],
  ["VFL and compatible known-good LC reference","VFL et référence LC compatible connue comme fonctionnelle"],
  ["Continue with mapping and connector checks.","Poursuivez les contrôles de correspondance et des connecteurs."],
  ["Check the VFL, its battery, LC attachment and reference lead first.","Vérifiez d’abord le VFL, sa batterie, le raccordement LC et le cordon de référence."],
  ["Inspect this section","Inspecter cette section"],
  ["Switch off the VFL and isolate the tested section from active equipment.","Éteignez le VFL et isolez la section testée des équipements actifs."],
  ["Inspect both mating end faces in this section. Clean if needed, then inspect again; check seating and bends.","Inspectez les deux faces en contact dans cette section. Nettoyez si nécessaire, puis réinspectez ; vérifiez l’insertion et les courbures."],
  ["After a change, start a retest on the same source, strand and route. Enter the new result.","Après une modification, lancez un nouveau test avec la même source, fibre et route. Saisissez le nouveau résultat."],
  ["Compatible inspection probe and approved cleaning tools","Sonde d’inspection compatible et outils de nettoyage approuvés"],
  ["Check both strands, then verify restored optical readings and service.","Vérifiez les deux fibres, puis les mesures optiques et le service rétabli."],
  ["Compare one compatible known-good cable or connection.","Comparez avec un câble ou une connexion compatible connue comme fonctionnelle."],
  ["Compare one component","Comparer un seul composant"],
  ["Replace only the suspect cable or mating assembly with a compatible known-good one.","Remplacez uniquement le câble ou l’assemblage de connexion suspect par un élément compatible connu comme fonctionnel."],
  ["Keep the source, LC attachment, strand and mapped ports unchanged. Record the comparison result.","Ne changez ni la source, ni le raccordement LC, ni la fibre, ni les ports prévus. Notez le résultat de la comparaison."],
  ["Compatible known-good cable or mating assembly","Câble ou assemblage de connexion compatible connu comme fonctionnel"],
  ["The original assembly or its connection is suspect.","L’assemblage d’origine ou sa connexion est suspect."],
  ["Check what both tests share; the original part is not cleared.","Vérifiez les éléments communs aux deux tests ; la pièce d’origine n’est pas mise hors de cause."],
  ["Repair, then prove the result","Réparer, puis vérifier le résultat"],
  ["Record the damaged or substituted component and use the approved repair procedure.","Notez le composant endommagé ou remplacé et suivez la procédure de réparation approuvée."],
  ["Start a fresh retest. Check both strands and the restored link before closing the case.","Lancez un nouveau test. Vérifiez les deux fibres et le lien rétabli avant de clôturer le dossier."],
  ["Approved repair or compatible replacement","Réparation approuvée ou remplacement compatible"],
  ["Retest passes","Nouveau test réussi"],
  ["Normalize and verify the required readings and service.","Normalisez et vérifiez les mesures requises et le service."],
  ["Retest fails","Nouveau test en échec"],
  ["Keep isolating; the recorded change did not prove recovery.","Poursuivez l’isolement ; la modification enregistrée n’a pas prouvé le rétablissement."],
  ["Get the next test arranged","Organiser le prochain test"],
  ["Recheck the source and mapping shared by both assemblies.","Revérifiez la source et la correspondance communes aux deux assemblages."],
  ["Keep the original fiber and connections suspect.","La fibre et les connexions d’origine restent suspectes."],
  ["Arrange optical loss testing for this section. Use a suitable OTDR if the fault location remains unknown.","Organisez une mesure de perte optique sur cette section. Utilisez un OTDR adapté si le défaut reste non localisé."],
  ["Copy the findings with the tested source, strand and endpoints for the person continuing the checks.","Copiez les constats avec la source, la fibre et les extrémités testées pour la personne qui poursuit les contrôles."],
  ["Light source and power meter / loss-test kit; suitable OTDR if needed","Source lumineuse et wattmètre / kit de mesure de perte ; OTDR adapté si nécessaire"],
  ["Recheck the conflicting result","Revérifier le résultat contradictoire"],
  ["Keep the source, pair, ports and test setup unchanged.","Gardez la même source, paire, ports et configuration de test."],
  ["Record the repeat result before replacing a part.","Notez le résultat répété avant de remplacer une pièce."],
  ["VFL and access to the recorded viewing point","VFL et accès au point d’observation enregistré"],
  ["Approved loopback and optic readings","Bouclage approuvé et mesures optiques"],
  ["Check the optic test setup","Vérifier le montage du test optique"],
  ["Verify the loop pair, seating and required attenuation against the approved setup.","Vérifiez la paire de bouclage, l’insertion et l’atténuation requise selon le montage approuvé."],
  ["Inspect, clean if needed and reinspect the connections.","Inspectez, nettoyez si nécessaire et réinspectez les connexions."],
  ["Repeat the direct loop. If it still fails, compare one compatible known-good loop or optic at a time.","Répétez la boucle directe. Si elle échoue encore, comparez un seul bouclage ou module optique compatible connu comme fonctionnel à la fois."],
  ["Approved LC loopback, inspection/cleaning tools and compatible spare","Bouclage LC approuvé, outils d’inspection/nettoyage et pièce de rechange compatible"],
  ["Test the optic first","Tester d’abord le module optique"],
  ["Test the next boundary","Tester la limite suivante"],
  ["Verify the failed loop setup before extending the test.","Vérifiez le montage de la boucle en échec avant d’étendre le test."],
  ["Use the approved loop at {0} with the mapped pair.","Utilisez le bouclage approuvé à {0} avec la paire prévue."],
  ["Compare TX and returning RX with the optic limits. Record Pass, Weak return or No return light.","Comparez TX et RX de retour aux limites du module optique. Notez Réussite, Retour faible ou Aucune lumière de retour."],
  ["Approved LC loopback and optic readings","Bouclage LC approuvé et mesures optiques"],
  ["Approved MMC loopback, CAS access and optic readings","Bouclage MMC approuvé, accès au CAS et mesures optiques"],
  ["Check the weak-light observation","Vérifier l’observation de lumière faible"],
  ["Trace the next point","Tracer jusqu’au point suivant"],
  ["Isolate both ends from active equipment. Attach the VFL only to the mapped LC leg.","Isolez les deux extrémités des équipements actifs. Branchez le VFL uniquement sur le brin LC prévu."],
  ["Check for light at {0} from the same source.","Vérifiez la lumière à {0} depuis la même source."],
  ["Brightness alone cannot measure loss. Arrange an optical loss test if the weak result remains.","La luminosité seule ne mesure pas la perte. Prévoyez une mesure de perte optique si le résultat reste faible."],
  ["Keep the source and strand unchanged; record the observed channel and light result.","Gardez la même source et fibre ; notez le canal observé et le résultat lumineux."],
  ["VFL with LC adapter and access to the viewing point","VFL avec adaptateur LC et accès au point d’observation"],
  ["Normalize and verify service","Normaliser et vérifier le service"],
  ["Remove the test tools and reconnect the mapped service path.","Retirez les outils de test et reconnectez le trajet de service prévu."],
  ["Check required lanes against each optic’s limits and confirm link status at the accessible ends.","Vérifiez les voies requises selon les limites de chaque module et confirmez l’état du lien aux extrémités accessibles."],
  ["Access to current optic readings and link status","Accès aux mesures optiques actuelles et à l’état du lien"],
  ["Link works","Le lien fonctionne"],
  ["Record the readings and work performed.","Consignez les mesures et les travaux réalisés."],
  ["Link still fails","Le lien échoue encore"],
  ["Keep the case open and check the remaining unverified path.","Gardez le dossier ouvert et vérifiez le reste du trajet non contrôlé."],
  ["Separate optical loss from device settings","Distinguer perte optique et réglages de l’équipement"],
  ["Compare current TX/RX and every required lane with the installed optic’s limits.","Comparez TX/RX actuels et chaque voie requise aux limites du module optique installé."],
  ["If optical power is outside limits, arrange loss testing of the suspect path.","Si la puissance optique est hors limites, prévoyez une mesure de perte sur le trajet suspect."],
  ["If power is within limits, verify the endpoint mapping, optic compatibility, port state, speed and FEC.","Si la puissance est dans les limites, vérifiez la correspondance des extrémités, la compatibilité optique, l’état du port, la vitesse et FEC."],
  ["Request readings and checks from the inaccessible end. That section is still unverified.","Demandez des mesures et contrôles à l’extrémité inaccessible. Cette section reste non vérifiée."],
  ["Optic readings and device access; optical loss-test kit if needed","Mesures optiques et accès à l’équipement ; kit de mesure de perte si nécessaire"],
  ["No reference lead available","Aucun cordon de référence disponible"],
  ["Get a compatible known-good LC reference lead, or hand off the recorded route and strand. Until the source is checked, the VFL setup and installed fiber both remain possible causes.","Obtenez un cordon LC de référence compatible connu comme fonctionnel, ou transmettez la route et la fibre enregistrées. Tant que la source n’est pas vérifiée, le montage VFL et la fibre installée restent des causes possibles."],
  ["The reference check could not be done. No passing source check has been recorded.","Le contrôle de référence n’a pas pu être réalisé. Aucun contrôle réussi de la source n’a été enregistré."],
  ["Where to check","Où vérifier"],
  ["What we know","Ce que nous savons"],
  ["Needed","Nécessaire"],
  ["Tools or access unavailable?","Outils ou accès indisponibles ?"],
  ["Test source: {0}","Source de test : {0}"],
  ["Test source: {0} · Strand {1}","Source de test : {0} · Fibre {1}"],
  ["Where to check: {0}","Où vérifier : {0}"],
  ["Best {0}/5","Meilleur résultat {0}/5"],
  ["{0} of 4 knowledge exams passed","{0} examens de connaissances sur 4 réussis"],
  ["Explain why and where to loop, what a result proves, and what to check next.","Expliquez pourquoi et où boucler, ce que prouve le résultat et quoi vérifier ensuite."],
  ["Choose the loop location","Choisir le point de bouclage"],
  ["You need to include the fiber from the local optic to CAS 1 in a loop test. Where does the approved loopback go?","Vous devez inclure la fibre entre le module optique local et CAS 1 dans le test de boucle. Où placer le bouchon de bouclage approuvé ?"],
  ["Directly in the local optic, leaving the installed fiber out.","Directement sur le module optique local, en excluant la fibre installée."],
  ["At the mapped CAS 1 connection, returning the tested pair toward the local optic.","Sur la connexion prévue de CAS 1, en renvoyant la paire testée vers le module optique local."],
  ["At any empty CAS port, because all ports share the same fiber.","Sur n’importe quel port CAS libre, car tous partagent la même fibre."],
  ["The MMC loopback at the mapped CAS connection turns the outgoing path back toward local RX. This includes the optic and the fiber and connections up to that loop point. Use the correct pair and approved setup; the onward path and remote optic remain outside the test.","Le bouchon MMC sur la connexion CAS prévue renvoie le trajet sortant vers RX local. Le test inclut le module optique, la fibre et les connexions jusqu’à ce point. Utilisez la bonne paire et le montage approuvé ; le trajet au-delà et le module distant restent hors du test."],
  ["The loop location sets the boundary of the test.","Le point de bouclage délimite le test."],
  ["Check a failed loop setup","Vérifier le montage d’une boucle en échec"],
  ["The first direct LC loop reports no return light. What should you do before declaring the optic faulty?","La première boucle LC directe ne reçoit aucune lumière de retour. Que faire avant de déclarer le module optique défectueux ?"],
  ["Replace the remote optic; it must send the return light.","Remplacer le module optique distant ; il doit envoyer la lumière de retour."],
  ["Repeat the same test without checking its setup.","Répéter le même test sans vérifier le montage."],
  ["Verify the approved loop, pair, seating and required attenuation; inspect and clean as needed, then retest.","Vérifier le bouclage approuvé, la paire, l’insertion et l’atténuation requise ; inspecter, nettoyer si nécessaire, puis retester."],
  ["A direct loop returns the local optic’s own light. A failed result can come from the test setup as well as the optic. Validate the setup and retest; if it still fails, use the approved known-good comparison to isolate the cause. The remote optic is not part of this test.","Une boucle directe renvoie la propre lumière du module local. Un échec peut venir du montage comme du module. Validez le montage et retestez ; si l’échec persiste, utilisez la comparaison approuvée avec un élément connu comme fonctionnel pour isoler la cause. Le module distant ne fait pas partie du test."],
  ["A failed loop is evidence to investigate, not a failed-part diagnosis.","Un échec de boucle est un indice à examiner, pas un diagnostic de pièce défectueuse."],
  ["Verify service after looping","Vérifier le service après le bouclage"],
  ["An MMC loop at CAS 1 passes. What must happen before you can call the service restored?","Une boucle MMC à CAS 1 réussit. Que faut-il faire avant de déclarer le service rétabli ?"],
  ["Leave the loop installed so local TX continues returning to local RX.","Laisser la boucle en place pour que TX local continue de revenir vers RX local."],
  ["Remove the loop, restore the mapped service connections, and check required lanes, optic limits and link status.","Retirer la boucle, rétablir les connexions de service prévues et vérifier les voies requises, les limites optiques et l’état du lien."],
  ["Accept a visible VFL glow as proof that network optical loss is acceptable.","Accepter une lueur VFL visible comme preuve d’une perte optique acceptable pour le réseau."],
  ["A loop pass applies to the tested return path. Remove the test tool and normalize the service connections, then verify the restored link. The pass does not clear untested fiber or the remote optic. VFL continuity also cannot confirm acceptable infrared loss.","La réussite concerne le trajet de retour testé. Retirez l’outil et normalisez les connexions de service, puis vérifiez le lien rétabli. La réussite ne valide ni la fibre non testée ni le module distant. La continuité VFL ne confirme pas non plus une perte infrarouge acceptable."],
  ["Loop passed → normalize → verify the restored service.","Boucle réussie → normaliser → vérifier le service rétabli."],
  ["Beginner includes four Apprentice exams, Loopbacks and hands-on patching. Intermediate combines those ideas in mixed scenarios. Choose any exam; there is no required order.","Débutant comprend quatre examens d’Apprenti, Bouclages et la pratique du brassage. Intermédiaire combine ces notions dans des scénarios variés. Choisissez librement ; aucun ordre n’est imposé."],
  ["Pass the four Apprentice exams with 4/5 to advance through Fiber Apprentice I–IV. Loopbacks and patching earn separate badges.","Réussissez les quatre examens d’Apprenti avec 4/5 pour progresser d’Apprenti fibre I à IV. Bouclages et brassage donnent des badges séparés."],
  ["Apprentice best results include retries. The Loopbacks badge requires 4/5 on a full exam; practice retries do not change its saved score.","Les meilleurs résultats d’Apprenti incluent les reprises. Le badge Bouclages exige 4/5 sur un examen complet ; les reprises d’entraînement ne modifient pas sa note enregistrée."],
  ["All four Apprentice exams passed. Loopbacks and patching have their own badges.","Les quatre examens d’Apprenti sont réussis. Bouclages et brassage ont leurs propres badges."],
  ["Loopbacks badge earned","Badge Bouclages obtenu"],
  ["{0} of 8 earned","{0} sur 8 obtenus"],
  ["Light view","Affichage de la lumière"],
  ["Loop (IR)","Boucle (IR)"],
  ["Show one light type at a time. All recorded results stay below.","Affichez un type de lumière à la fois. Tous les résultats enregistrés restent ci-dessous."],
  ["Why loop the light back?","Pourquoi renvoyer la lumière en boucle ?"],
  ["When a link fails, either optic or the fiber between them could be involved. A loop gives the local optic a return path so you can test a smaller part of the connection.","Lorsqu’une liaison échoue, l’un des modules optiques ou la fibre entre eux peut être en cause. Une boucle crée un chemin de retour vers le module local pour tester une partie plus petite de la connexion."],
  ["Same optic sends and receives","Le même module optique émet et reçoit"],
  ["Normally, local TX sends toward remote RX. For this test, a loop joins the outgoing path to the return path: local TX → loop → local RX. The remote optic is outside this test.","Normalement, le TX local émet vers le RX distant. Pour ce test, une boucle relie le trajet aller au trajet retour : TX local → boucle → RX local. Le module distant est hors de ce test."],
  ["The loop does not create light or repair the link. It returns the tested optic’s own light. Its location decides which fiber and connections the test includes.","La boucle ne produit pas de lumière et ne répare pas la liaison. Elle renvoie la lumière du module testé. Son emplacement détermine les fibres et connexions incluses dans le test."],
  ["Choose the location to answer your question","Choisissez l’emplacement selon ce que vous voulez vérifier"],
  ["LC at the optic · can it send and receive?","LC sur le module optique · peut-il émettre et recevoir ?"],
  ["A direct LC loop leaves the installed fiber route out. A pass supports the local TX and RX under this test. If it fails, check the approved setup and loop lead, inspect and clean as needed, then use a compatible known-good comparison. It does not blame the remote end.","Une boucle LC directe exclut le trajet de fibre installé. Une réussite confirme le TX et le RX locaux dans les conditions de ce test. En cas d’échec, vérifiez le montage approuvé et le cordon de boucle, inspectez et nettoyez si nécessaire, puis comparez avec un élément compatible dont le bon fonctionnement est connu. Cela ne met pas en cause l’extrémité distante."],
  ["MMC at a passive · does the added path work?","MMC sur un passif · le trajet ajouté fonctionne-t-il ?"],
  ["After a direct pass, a mapped MMC loop at an accessible CAS adds the outgoing and return fibers and their connections up to that point. A pass supports that tested pair; the onward route and remote optic remain untested.","Après la réussite de la boucle directe, une boucle MMC au port prévu d’un CAS accessible ajoute les fibres aller et retour et leurs connexions jusqu’à ce point. Une réussite confirme cette paire testée ; le trajet au-delà et le module distant restent non testés."],
  ["Ask: why this test, where does the light turn back, what is included, and what remains untested?","Demandez-vous : pourquoi ce test, où la lumière fait-elle demi-tour, qu’inclut-il et que reste-t-il à tester ?"],
  ["Use the site-approved loop mapping, compatible lead and any required attenuation. Judge a pass by the required readings and test criteria for the installed optic, not just the presence of light. Never look into a fiber end.","Utilisez le raccordement de boucle approuvé sur site, un cordon compatible et l’atténuation requise. Évaluez la réussite selon les mesures et critères du module installé, pas seulement selon la présence de lumière. Ne regardez jamais dans une extrémité de fibre."],
  ["After testing, remove the loop, Normalize the mapped connection, and verify the required readings, endpoint identity and live link.","Après le test, retirez la boucle, utilisez Normaliser pour reconnecter le trajet prévu, puis vérifiez les mesures requises, l’identité des extrémités et la liaison en service."],
  ["Juniper · physical loopback testing ↗","Juniper · tests de boucle physique ↗"],
  ["MMC at CAS 1 / 12: local TX → outgoing fiber → loop → return fiber → local RX. The optic, this pair and its connections are included; beyond CAS 1 is not.","MMC sur CAS 1 / 12 : TX local → fibre aller → boucle → fibre retour → RX local. Le module optique, cette paire et ses connexions sont inclus ; le trajet au-delà de CAS 1 ne l’est pas."],
  ["LC at the optic: local TX → short loop lead → local RX. This checks the local optic without the installed fiber route or remote optic.","LC sur le module optique : TX local → cordon de boucle court → RX local. Cela teste le module local sans le trajet de fibre installé ni le module distant."],
  ["Start small, then add one section. Each new loop still returns to the same local RX. Compare what changed when you moved it.","Commencez par une petite partie, puis ajoutez un tronçon. Chaque nouvelle boucle revient toujours au même RX local. Comparez ce qui change lorsque vous la déplacez."],
  ["Explain why and where to loop","Expliquer pourquoi et où placer une boucle"],
  ["The direct LC loop passed, but the restored link still fails. Why was that loop useful? Select TWO supported statements.","La boucle LC directe a réussi, mais la liaison reconnectée échoue encore. Pourquoi cette boucle était-elle utile ? Sélectionnez DEUX affirmations étayées."],
  ["It tested local TX and RX without relying on the installed fiber route or remote optic.","Elle a testé le TX et le RX locaux sans dépendre du trajet de fibre installé ni du module distant."],
  ["It proved that the remote optic can receive the local signal.","Elle a prouvé que le module distant peut recevoir le signal local."],
  ["It gave a local passing result to compare with a later loop that adds fiber and connections.","Elle a fourni une réussite locale à comparer avec une boucle ultérieure ajoutant de la fibre et des connexions."],
  ["It repaired the service path, so the remaining failure can be ignored.","Elle a réparé le trajet de service ; on peut donc ignorer l’échec restant."],
  ["The short loop returns local TX to local RX. It checks that small path and gives you a starting result before extending to an accessible passive. It neither reaches the remote optic nor repairs service. After testing, remove the loop and verify the restored connection.","La boucle courte renvoie le TX local vers le RX local. Elle teste ce petit trajet et fournit un résultat initial avant d’étendre le test à un passif accessible. Elle n’atteint pas le module distant et ne répare pas le service. Après le test, retirez la boucle et vérifiez la connexion rétablie."],
  ["A loop isolates a test path; moving it changes what you test.","Une boucle isole un trajet de test ; la déplacer change ce que vous testez."],
  ["Compare loop locations","Comparer les emplacements de boucle"],
  ["The direct and CAS 1 loops passed. The CAS 2 loop failed. Which added section does that comparison tell you to investigate?","Les boucles directe et sur CAS 1 ont réussi. Celle sur CAS 2 a échoué. Quel tronçon ajouté cette comparaison vous indique-t-elle d’examiner ?"],
  ["Moving the loop from CAS 1 to CAS 2 adds section B to the outgoing and return paths. First verify the failed loop setup, then investigate this added fiber and its connections. Section A passed the earlier test; section C and the remote optic were outside both CAS loops. This comparison narrows the search but does not identify a broken part.","Déplacer la boucle de CAS 1 à CAS 2 ajoute le tronçon B aux trajets aller et retour. Vérifiez d’abord le montage de la boucle qui a échoué, puis examinez la fibre ajoutée et ses connexions. Le tronçon A a réussi le test précédent ; le tronçon C et le module distant étaient hors des deux boucles CAS. Cette comparaison réduit la zone de recherche sans identifier une pièce cassée."],
  ["Recorded loop · earlier setup", "Boucle enregistrée · montage précédent"],
  ["Yellow: fiber · amber: investigate", "Jaune : fibre · orange : à examiner"],

  ["Front port open","Port avant ouvert"],
  ["Rear port open","Port arrière ouvert"],
  ["Bend, break, splice or damaged ferrule contact","Courbure, rupture, épissure ou contact de férule endommagé"],
  ["Loop results need rechecking","Les résultats des boucles doivent être revérifiés"],
  ["A loop failed at {0}, but a farther loop passed from the same optic.","Une boucle a échoué à {0}, mais une boucle plus éloignée a réussi depuis la même optique."],
  ["Recheck the earlier loop with the same optic, pair and limits. Inspect its seating and verify its mapping; a later pass does not explain the earlier failure.","Revérifiez la première boucle avec la même optique, la même paire et les mêmes limites. Vérifiez son enclenchement et son câblage ; une réussite ultérieure n’explique pas l’échec précédent."],
  ["Earlier light confirms this source and strand at that point. Confirm the physical mapping before blaming a component.","La lumière observée au point précédent confirme cette source et cette fibre jusqu’à ce point. Confirmez le câblage physique avant de mettre en cause un composant."],
  ["Switch off the VFL. Inspect the connectors and bends between {0} and {1}. Clean and reinspect as needed, then retest strand {2} from the same LC.","Éteignez le VFL. Inspectez les connecteurs et les courbures entre {0} et {1}. Nettoyez et réinspectez si nécessaire, puis retestez la fibre {2} depuis le même LC."],
  ["This strand passed at the earlier point. Focus on the added cable and its mating connections.","Cette fibre a réussi au point précédent. Concentrez-vous sur le câble ajouté et ses connexions d’accouplement."],
  ["Compare the added cable / assembly between {0} and {1} with a known-good compatible one. Keep the same source, strand and ports; record whether the replacement passes.","Comparez le câble ou l’ensemble ajouté entre {0} et {1} avec un élément compatible dont le bon fonctionnement est connu. Gardez la même source, la même fibre et les mêmes ports ; notez si le remplacement réussit."],
  ["CAS {0} · port layout","CAS {0} · disposition des ports"],
  ["Rear MMC","MMC arrière"],
  ["Front MMC","MMC avant"],
  ["Fanout head","Tête du fanout"],
  ["Onward cable","Câble suivant"],
  ["Port {0} · MMC mating point","Port {0} · raccordement MMC"],
  ["CAS {0} connection: the rear female MMC fanout head mates with the front male MMC onward cable at the selected port.","Connexion CAS {0} : la tête MMC femelle du fanout à l’arrière s’accouple au MMC mâle du câble sortant à l’avant, au port sélectionné."],
  ["CAS {0} connection: two MMC mating connectors. Follow the actual cable record.","Connexion CAS {0} : deux connecteurs MMC accouplés. Suivez le relevé réel du câble."],
  ["Fanout head · female MMC","Tête du fanout · MMC femelle"],
  ["Front · extension unplugged","Avant · extension débranchée"],
  ["Rear · extension unplugged","Arrière · extension débranchée"],
  ["History","Historique"],
  ["Why this check?","Pourquoi ce contrôle ?"],
  ["Case details", "Détails du cas"],
  ["Recorded continuity", "Continuité enregistrée"],
  ["Recorded section: {0} → {1}; {2}; {3}", "Section enregistrée : {0} → {1} ; {2} ; {3}"],
  ["Red dashed: VFL passed", "Pointillés rouges : VFL réussi"],
  ["Fiber diagram; scroll down to follow the path", "Schéma de fibre ; faites défiler vers le bas pour suivre le chemin"],
  ["New case started","Nouveau cas commencé"],
  ["Choose your path, then place a tool to begin.","Choisissez votre parcours, puis placez un outil pour commencer."],
  [
    "Play light",
    "Animer la lumière"
  ],
  [
    "Pause light",
    "Mettre en pause"
  ],
  [
    "Not connected",
    "Non connecté"
  ],
  [
    "Isolate both ends, then connect VFL to the fiber.",
    "Isolez les deux extrémités, puis raccordez le VFL à la fibre."
  ],
  [
    "Not checked",
    "Non vérifié"
  ],
  [
    "VFL is connected. Check the mapped port and strand.",
    "Le VFL est connecté. Vérifiez le port et la fibre attribués."
  ],
  [
    "Light seen ✓",
    "Lumière visible ✓"
  ],
  [
    "Trace confirmed here; attenuation is still untested.",
    "Traçage confirmé ici ; l’atténuation reste à mesurer."
  ],
  [
    "No light here ×",
    "Aucune lumière ici ×"
  ],
  [
    "Check this span, its connections and nearby ports.",
    "Vérifiez ce tronçon, ses connexions et les ports voisins."
  ],
  [
    "Wrong port",
    "Mauvais port"
  ],
  [
    "Light is at another port. Check the map and polarity.",
    "La lumière arrive sur un autre port. Vérifiez le plan et la polarité."
  ],
  [
    "Segment {0}",
    "Tronçon {0}"
  ],
  [
    "✓ Optic loop passed",
    "✓ Boucle optique réussie"
  ],
  [
    "{0} traced",
    "{0} tracé"
  ],
  [
    "Local optic disconnected from the VFL test.",
    "Le module optique local est déconnecté du test VFL."
  ],
  [
    "Disconnect active equipment before connecting VFL.",
    "Déconnectez les équipements actifs avant de raccorder le VFL."
  ],
  [
    "Segment {0}. {1} {2}. {3} segments traced. {4}",
    "Tronçon {0}. {1} {2}. {3} tronçons tracés. {4}"
  ],
  [
    "Disconnected",
    "Déconnecté"
  ],
  [
    "Disconnect first",
    "Déconnecter d’abord"
  ],
  [
    "First test point",
    "Premier point de test"
  ],
  [
    "Last traced point",
    "Dernier point tracé"
  ],
  [
    "Local optic",
    "Optique locale"
  ],
  [
    "Next passive",
    "Passif suivant"
  ],
  [
    "Expected",
    "Attendu"
  ],
  [
    "Other",
    "Autre"
  ],
  [
    "Example optic health readings in dBm",
    "Exemples de mesures optiques en dBm"
  ],
  [
    "✓ Good example",
    "✓ Bon exemple"
  ],
  [
    "× No light",
    "× Aucune lumière"
  ],
  [
    "dBm examples · use site / optic limits",
    "Exemples en dBm · utilisez les limites du site / module"
  ],
  [
    "Result",
    "Résultat"
  ],
  [
    "Step {0} · {1}",
    "Étape {0} · {1}"
  ],
  [
    "Actions and answers you chose",
    "Actions et réponses choisies"
  ],
  [
    "Change step {0}: {1}. You chose {2}.",
    "Modifier l’étape {0} : {1}. Vous avez choisi {2}."
  ],
  [
    "Yes ✓",
    "Oui ✓"
  ],
  [
    "No ×",
    "Non ×"
  ],
  [
    "Chose {0}",
    "Choix : {0}"
  ],
  [
    "Your result",
    "Votre résultat"
  ],
  [
    "Next action",
    "Action suivante"
  ],
  [
    "Start here",
    "Commencer ici"
  ],
  [
    "Yes",
    "Oui"
  ],
  [
    "Next: {0}",
    "Suite : {0}"
  ],
  [
    "Start a new check",
    "Commencer un nouveau contrôle"
  ],
  [
    "You chose {0}.",
    "Vous avez choisi {0}."
  ],
  [
    "Read the evidence",
    "Interpréter les preuves"
  ],
  [
    "Follow the whole connection",
    "Suivre toute la connexion"
  ],
  [
    "Compare loop results, trace limits and changes before choosing the next check.",
    "Comparez les boucles, les limites du traçage et les changements avant de choisir le prochain contrôle."
  ],
  [
    "Connect device data, direction, rack location, FIM and individual fiber paths.",
    "Reliez données, direction, emplacement en baie, FIM et chemins de fibre individuels."
  ],
  [
    "Bound the suspect section",
    "Délimiter le tronçon suspect"
  ],
  [
    "The same pair is tested with valid loops. Nothing else changes. Which conclusion is supported?",
    "Le même couple de fibres est testé avec des boucles valides. Rien d’autre ne change. Quelle conclusion est justifiée ?"
  ],
  [
    "The failure is beyond CAS 2; both passives have now been tested.",
    "La panne se situe après CAS 2 ; les deux passifs ont été testés."
  ],
  [
    "The added CAS 1 → CAS 2 span and its connections need investigation; the exact cause is unknown.",
    "Le tronçon ajouté CAS 1 → CAS 2 et ses connexions doivent être examinés ; la cause exacte est inconnue."
  ],
  [
    "The fiber between CAS 1 and CAS 2 is definitely broken.",
    "La fibre entre CAS 1 et CAS 2 est forcément cassée."
  ],
  [
    "The local optic must be intermittent because the CAS 2 loop failed.",
    "L’optique locale doit avoir une panne intermittente puisque la boucle CAS 2 a échoué."
  ],
  [
    "Compare what each loop adds. Passing at CAS 1 and failing at CAS 2 narrows the next investigation to the added section, including its connections. A valid loop result does not name the failed part.",
    "Comparez ce que chaque boucle ajoute. Une réussite à CAS 1 suivie d’un échec à CAS 2 limite la recherche au tronçon ajouté et à ses connexions. Un résultat de boucle valide ne désigne pas la pièce défectueuse."
  ],
  [
    "The route beyond CAS 2 is outside all three loops.",
    "Le chemin après CAS 2 est hors des trois boucles."
  ],
  [
    "This follows the boundary between the passed test and the failed test.",
    "Cette conclusion suit la limite entre le test réussi et le test échoué."
  ],
  [
    "A break is one possibility; contamination, seating, mapping or loss can also fit.",
    "Une rupture est possible ; contamination, mauvais enclenchement, affectation ou perte peuvent aussi expliquer le résultat."
  ],
  [
    "There is no evidence of an intermittent optic in this unchanged, valid test sequence.",
    "Cette séquence de tests valides et inchangés ne prouve pas une panne intermittente de l’optique."
  ],
  [
    "Investigate the added section; do not invent a cause.",
    "Examinez le tronçon ajouté ; n’inventez pas de cause."
  ],
  [
    "Separate continuity from loss",
    "Distinguer continuité et perte"
  ],
  [
    "VFL reaches the expected port and strand. After the mapped link is restored, RX is still low. Which two conclusions fit?",
    "Le VFL atteint le port et la fibre attendus. Après rétablissement de la liaison prévue, RX reste faible. Quelles sont les deux conclusions valides ?"
  ],
  [
    "The visible trace supports continuity and mapping for the tested strand.",
    "Le traçage visible confirme la continuité et l’affectation de la fibre testée."
  ],
  [
    "The trace proves the network-light loss is acceptable.",
    "Le traçage prouve que la perte de lumière du réseau est acceptable."
  ],
  [
    "The reading is below the supplied limit; optical loss and connections still need investigation.",
    "La mesure est sous la limite indiquée ; la perte optique et les connexions restent à examiner."
  ],
  [
    "The passive must be failing to generate enough light.",
    "Le passif doit être incapable de produire assez de lumière."
  ],
  [
    "The red-light test and the RX reading answer different questions. −4.40 is below this example’s −3.00 minimum. Trace success cannot replace an appropriate optical loss test or the final link-health check.",
    "Le test à lumière rouge et la mesure RX répondent à des questions différentes. −4.40 est sous le minimum de −3.00 de cet exemple. Un traçage réussi ne remplace ni une mesure de perte optique adaptée ni le contrôle final de la liaison."
  ],
  [
    "It reached the expected destination on the strand actually tested.",
    "La lumière a atteint la destination attendue sur la fibre réellement testée."
  ],
  [
    "VFL does not measure acceptable loss at the service wavelength.",
    "Le VFL ne mesure pas si la perte à la longueur d’onde de service est acceptable."
  ],
  [
    "A correct route can still lose too much light. Inspect connections and measure loss as appropriate.",
    "Un chemin correct peut perdre trop de lumière. Inspectez les connexions et mesurez la perte si nécessaire."
  ],
  [
    "A passive passes light; it does not generate it.",
    "Un passif transmet la lumière ; il ne la produit pas."
  ],
  [
    "Correct destination + weak RX: continuity is not enough.",
    "Bonne destination + RX faible : la continuité ne suffit pas."
  ],
  [
    "Know what a loop cannot prove",
    "Savoir ce qu’une boucle ne prouve pas"
  ],
  [
    "A valid MMC loop returns light within limits. After restoring service, RX is dark. End-to-end strand pairing has not been checked. What is the best next check?",
    "Une boucle MMC valide renvoie de la lumière dans les limites. Après remise en service, RX ne reçoit aucune lumière. L’affectation des fibres de bout en bout n’a pas été vérifiée. Quel est le meilleur contrôle suivant ?"
  ],
  [
    "Repeat the identical successful loop; another pass will establish end-to-end polarity.",
    "Répéter la même boucle réussie ; une nouvelle réussite établira la polarité de bout en bout."
  ],
  [
    "Replace the local optic because its service RX is dark.",
    "Remplacer l’optique locale parce que son RX est sans lumière en service."
  ],
  [
    "Treat the remote device as failed because the passive loop passed.",
    "Considérer l’équipement distant comme défectueux puisque la boucle au passif a réussi."
  ],
  [
    "Verify that each TX lands on the intended RX, using the FIM strand map.",
    "Vérifier que chaque TX aboutit au RX prévu à l’aide du plan de fibres FIM."
  ],
  [
    "The loop established a return path for the tested pair. It did not prove the restored TX-to-RX assignments. Verify the unchecked mapping before concluding which component failed.",
    "La boucle a établi un chemin de retour pour le couple testé. Elle n’a pas prouvé les affectations TX–RX après rétablissement. Vérifiez l’affectation encore inconnue avant de conclure qu’un composant est défectueux."
  ],
  [
    "A repeat of the same loop does not test the missing end-to-end assignment.",
    "Répéter la même boucle ne teste pas l’affectation de bout en bout manquante."
  ],
  [
    "Dark RX alone does not outweigh the passed loop or identify the cause.",
    "Un RX sans lumière n’annule pas le résultat de boucle et n’identifie pas la cause."
  ],
  [
    "The remote device was not included in the local loop.",
    "L’équipement distant n’était pas inclus dans la boucle locale."
  ],
  [
    "This tests the remaining uncertainty. A pair can close a loop even with swapped end-to-end assignments.",
    "Ce contrôle examine l’incertitude restante. Un couple peut fermer une boucle même si ses affectations de bout en bout sont inversées."
  ],
  [
    "A return loop and correct service polarity are different checks.",
    "Une boucle de retour et une polarité correcte en service sont deux contrôles différents."
  ],
  [
    "Keep multiple causes open",
    "Garder plusieurs causes possibles"
  ],
  [
    "The optic passes its direct loop. One mapped channel fails when the external path is added. Which conclusions are justified? Select all that apply.",
    "L’optique réussit sa boucle directe. Un canal attribué échoue lorsque le chemin externe est ajouté. Quelles conclusions sont justifiées ? Sélectionnez toutes les réponses valides."
  ],
  [
    "Other working channels prove the entire MMC head and every fiber are good.",
    "Les autres canaux fonctionnels prouvent que toute la tête MMC et chaque fibre sont en bon état."
  ],
  [
    "Contamination or a damaged ferrule affecting this channel remains possible.",
    "Une contamination ou une férule endommagée affectant ce canal reste possible."
  ],
  [
    "Damage, a bend, a poor splice or incorrect routing on this channel remains possible.",
    "Un dommage, une courbure, une mauvaise épissure ou un mauvais cheminement sur ce canal reste possible."
  ],
  [
    "These results alone cannot distinguish the exact cause.",
    "Ces résultats seuls ne permettent pas de distinguer la cause exacte."
  ],
  [
    "A fanout contains separate paths. A problem can affect a single channel while others work. Inspect and test the affected path and interfaces; a dark channel is not a diagnosis of ferrule damage or a splice failure.",
    "Un fanout contient des chemins séparés. Un problème peut affecter un seul canal tandis que les autres fonctionnent. Inspectez et testez le chemin concerné et ses interfaces ; un canal sans lumière ne diagnostique pas une férule endommagée ou une épissure défectueuse."
  ],
  [
    "Working channels do not verify an untested or failing channel.",
    "Des canaux fonctionnels ne valident pas un canal non testé ou défaillant."
  ],
  [
    "The ferrule aligns fibers; contamination or damage can affect selected paths.",
    "La férule aligne les fibres ; contamination ou dommages peuvent affecter certains chemins."
  ],
  [
    "These faults can produce a similar symptom on the affected path.",
    "Ces défauts peuvent produire un symptôme similaire sur le chemin concerné."
  ],
  [
    "The evidence narrows the investigation but does not identify a particular defect.",
    "Les preuves réduisent le périmètre de recherche sans identifier un défaut précis."
  ],
  [
    "Follow the failed channel; keep its possible causes open.",
    "Suivez le canal défaillant ; gardez ses causes possibles ouvertes."
  ],
  [
    "Chapter 3 · separate fanout paths",
    "Chapitre 3 · chemins séparés du fanout"
  ],
  [
    "Interpret improvements carefully",
    "Interpréter prudemment les améliorations"
  ],
  [
    "After two changes, RX is within the supplied range. Link status and the other required lanes are still unchecked. Which report is accurate?",
    "Après deux changements, RX est dans la plage indiquée. L’état de la liaison et les autres canaux requis restent à vérifier. Quel compte rendu est exact ?"
  ],
  [
    "The observed RX improved; the exact contribution of each change is unknown. Check remaining lanes and link status.",
    "Le RX observé s’est amélioré ; la contribution de chaque changement est inconnue. Vérifiez les autres canaux et l’état de la liaison."
  ],
  [
    "The bend caused the issue because RX improved after the work.",
    "La courbure causait le problème puisque RX s’est amélioré après l’intervention."
  ],
  [
    "The new reading proves the full link is repaired.",
    "La nouvelle mesure prouve que toute la liaison est réparée."
  ],
  [
    "The connector was the cause because seating was the last action.",
    "Le connecteur était la cause puisque son réenclenchement était la dernière action."
  ],
  [
    "Relieving a bend and reseating before measuring prevents you from separating their effects. The new reading is useful evidence, but closing the issue requires the remaining readings and link check.",
    "Corriger une courbure et réenclencher avant de mesurer empêche de séparer leurs effets. La nouvelle mesure est utile, mais clôturer l’incident nécessite les autres mesures et le contrôle de liaison."
  ],
  [
    "It separates the observed improvement from assumptions and names the unfinished checks.",
    "Ce compte rendu distingue l’amélioration observée des suppositions et précise les contrôles restants."
  ],
  [
    "The reseat could also have contributed; neither action was measured on its own.",
    "Le réenclenchement a aussi pu contribuer ; aucune action n’a été mesurée séparément."
  ],
  [
    "One reading does not cover all required lanes or confirm a working link.",
    "Une mesure ne couvre pas tous les canaux requis et ne confirme pas une liaison fonctionnelle."
  ],
  [
    "Action order alone does not establish which change caused the improvement.",
    "L’ordre des actions ne permet pas de savoir quel changement a causé l’amélioration."
  ],
  [
    "Record what improved and what remains unverified.",
    "Notez ce qui s’est amélioré et ce qui reste à vérifier."
  ],
  [
    "Explain data conversion",
    "Expliquer la conversion des données"
  ],
  [
    "Device A sends data to Device B through two cassettes. Which description correctly explains the conversions?",
    "L’équipement A envoie des données à B à travers deux cassettes. Quelle description explique correctement les conversions ?"
  ],
  [
    "A’s optic makes light; each CAS turns it into data and back into new light before passing it on.",
    "L’optique de A produit de la lumière ; chaque CAS la convertit en données puis en nouvelle lumière avant de la transmettre."
  ],
  [
    "A’s optic sends visible red light; B’s optic turns it into electrical signals.",
    "L’optique de A envoie de la lumière rouge visible ; celle de B la convertit en signaux électriques."
  ],
  [
    "A’s optic turns electrical signals into IR light; the passives carry it; B’s optic turns received light into electrical signals.",
    "L’optique de A convertit les signaux électriques en lumière IR ; les passifs la transportent ; celle de B convertit la lumière reçue en signaux électriques."
  ],
  [
    "A’s optic only forwards electrical signals; the first CAS converts them into IR light.",
    "L’optique de A transmet seulement des signaux électriques ; le premier CAS les convertit en lumière IR."
  ],
  [
    "The active optics perform the conversions. In this passive route, the cassettes connect the mapped fiber paths; they do not read the data or create a new source.",
    "Les optiques actives réalisent les conversions. Sur ce chemin passif, les cassettes raccordent les fibres attribuées ; elles ne lisent pas les données et ne créent pas de nouvelle source."
  ],
  [
    "The passive CAS does not perform electrical-to-optical conversion.",
    "Le CAS passif ne réalise pas de conversion électrique-optique."
  ],
  [
    "Visible red tracing light comes from a VFL, not the service-light example.",
    "La lumière rouge visible de traçage vient d’un VFL, pas de la lumière de service de cet exemple."
  ],
  [
    "This follows the complete device → optic → fiber → optic → device journey.",
    "Cette description suit le parcours complet équipement → optique → fibre → optique → équipement."
  ],
  [
    "The device’s optic, not the passive, produces the service light.",
    "L’optique de l’équipement, et non le passif, produit la lumière de service."
  ],
  [
    "Conversion happens at the optics; passives carry the path.",
    "Les optiques convertissent ; les passifs assurent le chemin."
  ],
  [
    "Reason from either end",
    "Raisonner depuis chaque extrémité"
  ],
  [
    "You move from Device A to Device B. B reports healthy local TX but dark local RX. Which direction needs a no-light investigation?",
    "Vous passez de l’équipement A à B. B indique un TX local normal mais un RX local sans lumière. Dans quel sens faut-il rechercher l’absence de lumière ?"
  ],
  [
    "B TX → A RX, because B is now local.",
    "B TX → A RX, car B est désormais local."
  ],
  [
    "A TX → B RX, including its source, mapped fiber and receiving interface.",
    "A TX → B RX, en incluant la source, la fibre attribuée et l’interface de réception."
  ],
  [
    "Both directions are proven dark because the two devices share a cable assembly.",
    "Les deux sens sont forcément sans lumière puisque les équipements partagent un ensemble de câbles."
  ],
  [
    "Only B’s transmitter, because the TX/RX names reverse when you move.",
    "Uniquement l’émetteur de B, car les noms TX/RX s’inversent lorsque vous vous déplacez."
  ],
  [
    "Local changes with your viewpoint; TX still sends and RX still receives. At B, the missing incoming light belongs to A TX → B RX. B’s TX report does not prove that A receives its outgoing light.",
    "Le terme local dépend de votre point de vue ; TX émet toujours et RX reçoit toujours. Chez B, la lumière entrante manquante correspond à A TX → B RX. Le TX de B ne prouve pas que A reçoit sa lumière sortante."
  ],
  [
    "That is the outgoing direction from B; its receiver is at A.",
    "C’est le sens sortant depuis B ; le récepteur est chez A."
  ],
  [
    "This is the incoming direction measured by B’s RX. The symptom does not locate the fault.",
    "C’est le sens entrant mesuré par RX de B. Le symptôme ne localise pas la panne."
  ],
  [
    "Separate strands can have different conditions; the report does not prove both are dark.",
    "Des fibres séparées peuvent être dans des états différents ; le rapport ne prouve pas que les deux sont sans lumière."
  ],
  [
    "Changing viewpoint does not change what a transmitter or receiver does.",
    "Changer de point de vue ne change pas le rôle d’un émetteur ou d’un récepteur."
  ],
  [
    "At B, local RX is fed by A TX.",
    "Chez B, RX local est alimenté par TX de A."
  ],
  [
    "Combine location and FIM mapping",
    "Combiner emplacement et affectation FIM"
  ],
  [
    "Use the mock ticket and the optic orientation shown. Which complete patch matches the record?",
    "Utilisez l’ordre de raccordement fictif et l’orientation de l’optique illustrée. Quel raccordement complet correspond au registre ?"
  ],
  [
    "Elevation 30; optic 7, right LC position; mapped leg 8; its head to CAS 2 / 28.",
    "Hauteur 30 ; optique 7, position LC droite ; branche 8 attribuée ; sa tête vers CAS 2 / 28."
  ],
  [
    "Elevation 17; optic 7, left LC position; mapped leg 8; its head to CAS 2 / 28.",
    "Hauteur 17 ; optique 7, position LC gauche ; branche 8 attribuée ; sa tête vers CAS 2 / 28."
  ],
  [
    "Elevation 30; optic 7, left LC position; any leg with the same head serial; head to CAS 2 / 28.",
    "Hauteur 30 ; optique 7, position LC gauche ; n’importe quelle branche portant le même numéro de tête ; tête vers CAS 2 / 28."
  ],
  [
    "Elevation 30; optic 7, left LC position; mapped leg 8; its head to CAS 2 / 28.",
    "Hauteur 30 ; optique 7, position LC gauche ; branche 8 attribuée ; sa tête vers CAS 2 / 28."
  ],
  [
    "In the position code, 17 is the rack and 30 is the elevation. With the purple tab below, this site’s 7/5 is on the left. The ticket assigns leg 8 and CAS 2 / 28; a matching head serial does not make its legs interchangeable.",
    "Dans le code de position, 17 désigne la baie et 30 la hauteur. Avec la languette violette en bas, le 7/5 de ce site est à gauche. L’ordre attribue la branche 8 et CAS 2 / 28 ; le même numéro de tête ne rend pas les branches interchangeables."
  ],
  [
    "7/5 is on the right when upright; the pictured optic is flipped.",
    "7/5 est à droite en position normale ; l’optique illustrée est retournée."
  ],
  [
    "17 is the rack number, not the elevation.",
    "17 est le numéro de baie, pas la hauteur."
  ],
  [
    "Each follower has its own mapping. Matching the head alone is insufficient.",
    "Chaque branche a sa propre affectation. Vérifier seulement la tête ne suffit pas."
  ],
  [
    "This matches location, flipped optic position, follower and passive destination.",
    "Ce choix respecte l’emplacement, l’optique retournée, la branche et le passif de destination."
  ],
  [
    "Location + orientation + exact follower + mapped head destination.",
    "Emplacement + orientation + branche exacte + destination attribuée à la tête."
  ],
  [
    "Chapter 2 · read the rack position",
    "Chapitre 2 · lire la position en baie"
  ],
  [
    "Keep fanout paths distinct",
    "Distinguer les chemins du fanout"
  ],
  [
    "Leg 3 is dark. Leg 8 on the same MMC head works. FIM assigns the affected optic to leg 3. Which two statements are supported?",
    "La branche 3 est sans lumière. La branche 8 de la même tête MMC fonctionne. FIM attribue l’optique concernée à la branche 3. Quelles sont les deux affirmations justifiées ?"
  ],
  [
    "Leg 8 working does not prove leg 3’s separate path is healthy.",
    "Le fonctionnement de la branche 8 ne prouve pas que le chemin séparé de la branche 3 est bon."
  ],
  [
    "Moving the affected optic to leg 8 is correct because both legs share a serial.",
    "Déplacer l’optique concernée sur la branche 8 est correct puisque les deux branches partagent un numéro de série."
  ],
  [
    "Trace leg 3 and its mapped channel through the head and passive.",
    "Tracez la branche 3 et son canal attribué à travers la tête et le passif."
  ],
  [
    "The shared head splits leg 8’s working light into every other follower.",
    "La tête commune répartit la lumière fonctionnelle de la branche 8 dans toutes les autres branches."
  ],
  [
    "The serial identifies the assembly, not an interchangeable destination for every follower. Track the assigned leg through its own channel; do not treat a working neighbor as proof of that path.",
    "Le numéro de série identifie l’ensemble, pas une destination interchangeable pour chaque branche. Suivez la branche attribuée dans son canal ; une voisine fonctionnelle ne valide pas ce chemin."
  ],
  [
    "Separate fibers can have different conditions within the same assembly.",
    "Des fibres d’un même ensemble peuvent être dans des états différents."
  ],
  [
    "Changing legs changes the mapped connection and requires an authorized mapping change.",
    "Changer de branche change la connexion attribuée et nécessite une modification d’affectation autorisée."
  ],
  [
    "This follows the affected circuit without assuming every leg shares the same path.",
    "Cette approche suit le circuit concerné sans supposer que toutes les branches partagent le même chemin."
  ],
  [
    "The fanout groups fiber paths; it does not split one optic’s light into all followers.",
    "Le fanout regroupe des chemins de fibre ; il ne divise pas la lumière d’une optique entre toutes les branches."
  ],
  [
    "Shared assembly, separate mapped paths.",
    "Ensemble commun, chemins attribués séparés."
  ],
  [
    "Separate source and route evidence",
    "Séparer les preuves sur la source et le chemin"
  ],
  [
    "The report shows −40 for local TX and RX. Someone blames both readings on reversed polarity. What should you check before accepting that diagnosis?",
    "Le rapport indique −40 pour TX et RX locaux. Quelqu’un attribue les deux mesures à une polarité inversée. Que vérifier avant d’accepter ce diagnostic ?"
  ],
  [
    "Swap the fibers first; a polarity mismatch always stops the local laser.",
    "Inverser d’abord les fibres ; un défaut de polarité arrête toujours le laser local."
  ],
  [
    "Verify local TX reporting, the selected lane, port / laser state and optic seating; polarity alone does not explain missing TX output.",
    "Vérifier le rapport TX local, le canal sélectionné, l’état du port / laser et l’enclenchement de l’optique ; la polarité seule n’explique pas l’absence d’émission TX."
  ],
  [
    "Start with VFL only; continuity also measures the optic’s transmitter output.",
    "Commencer uniquement par le VFL ; la continuité mesure aussi la puissance émise par l’optique."
  ],
  [
    "Record a broken external fiber as the cause of both readings.",
    "Noter une rupture de fibre externe comme cause des deux mesures."
  ],
  [
    "TX describes the local source; RX describes incoming light. A pairing problem can leave RX dark while TX still emits. Verify the reported source condition, then isolate with the approved test instead of assigning a cause from −40 alone.",
    "TX décrit la source locale ; RX décrit la lumière entrante. Un problème d’appariement peut laisser RX sans lumière alors que TX émet toujours. Vérifiez l’état de la source indiqué, puis isolez avec le test approuvé au lieu d’attribuer une cause au seul −40."
  ],
  [
    "A routing mismatch does not by itself prove that the local transmitter stopped emitting.",
    "Une erreur de cheminement ne prouve pas à elle seule que l’émetteur local a cessé d’émettre."
  ],
  [
    "This checks whether the source is producing light and whether the report is being read correctly.",
    "Ce contrôle vérifie si la source produit de la lumière et si le rapport est bien interprété."
  ],
  [
    "VFL supplies separate red light and does not measure the service transmitter.",
    "Le VFL fournit sa propre lumière rouge et ne mesure pas l’émetteur de service."
  ],
  [
    "The report does not identify a break, and an external break alone does not establish absent local TX output.",
    "Le rapport n’identifie pas une rupture, et une rupture externe seule ne prouve pas l’absence d’émission TX locale."
  ],
  [
    "Verify the source separately from the incoming route.",
    "Vérifiez la source séparément du chemin entrant."
  ],
  [
    "Device A",
    "Équipement A"
  ],
  [
    "Rack CAS",
    "CAS de baie"
  ],
  [
    "Distribution CAS",
    "CAS de distribution"
  ],
  [
    "Room passage",
    "Passage entre salles"
  ],
  [
    "Device B",
    "Équipement B"
  ],
  [
    "{0} · TX",
    "{0} · TX"
  ],
  [
    "Device {0} turns data into light",
    "L’équipement {0} convertit les données en lumière"
  ],
  [
    "The device supplies electrical data to its optic. TX produces infrared light carrying that data into one strand of the LC connection.",
    "L’équipement fournit des données électriques à son optique. TX produit de la lumière infrarouge qui transporte ces données dans une fibre de la connexion LC."
  ],
  [
    "From {0}, the MMC head fans out to LC legs. The mapped receiving strand reaches Device {1}’s RX, which converts the light back into electrical data.",
    "Depuis {0}, la tête MMC se répartit en branches LC. La fibre réceptrice attribuée atteint RX de l’équipement {1}, qui reconvertit la lumière en données électriques."
  ],
  [
    "Follow the LC leg up the rack to its female MMC head at the rear of {0}. The mapped connection carries the light through to the male MMC on the front, then into the onward fiber.",
    "Suivez la branche LC en remontant la baie jusqu’à sa tête MMC femelle à l’arrière de {0}. La connexion attribuée transmet la lumière au MMC mâle avant, puis à la fibre suivante."
  ],
  [
    "The inter-room fiber joins {0} to {1}. This passive is the entry point on the other side of this example route. It passes the same optical signal onward.",
    "La fibre entre salles relie {0} à {1}. Ce passif est l’entrée de l’autre côté de ce parcours d’exemple. Il transmet le même signal optique."
  ],
  [
    "From {0}, the fiber reaches {1} at the device rack. In this site example, light enters through the front male MMC and leaves through the rear female MMC toward the LC fanout.",
    "Depuis {0}, la fibre atteint {1} dans la baie de l’équipement. Dans cet exemple du site, la lumière entre par le MMC mâle avant et sort par le MMC femelle arrière vers le fanout LC."
  ],
  [
    "The onward fiber from {0} reaches {1}, the {2}. Its mapped connection passes the light into the next fiber section. It does not read the data or create new light.",
    "La fibre sortante de {0} atteint {1}, le {2}. Sa connexion attribuée transmet la lumière au tronçon suivant. Elle ne lit pas les données et ne crée pas de nouvelle lumière."
  ],
  [
    "{0} · RX",
    "{0} · RX"
  ],
  [
    "Device {0} receives the light",
    "L’équipement {0} reçoit la lumière"
  ],
  [
    "Data → {0}",
    "Données → {0}"
  ],
  [
    "Device {0} can use the data",
    "L’équipement {0} peut utiliser les données"
  ],
  [
    "RX converts the received light into electrical signals for Device {0}. To send data back, Device {1} uses its own TX and a separate mapped strand to Device {2}’s RX.",
    "RX convertit la lumière reçue en signaux électriques pour l’équipement {0}. Pour répondre, l’équipement {1} utilise son propre TX et une fibre attribuée séparée vers RX de l’équipement {2}."
  ],
  [
    "ROOM A",
    "SALLE A"
  ],
  [
    "ROOM B",
    "SALLE B"
  ],
  [
    "Fiber between rooms",
    "Fibre entre salles"
  ],
  [
    "Port 12 · mapped pair",
    "Port 12 · couple attribué"
  ],
  [
    "MMC head",
    "Tête MMC"
  ],
  [
    "Passage → distribution → rack",
    "Passage → distribution → baie"
  ],
  [
    "Rack → distribution → passage",
    "Baie → distribution → passage"
  ],
  [
    "Same optical signal · six passive connection points",
    "Même signal optique · six connexions passives"
  ],
  [
    "Data",
    "Données"
  ],
  [
    "LC strand",
    "Fibre LC"
  ],
  [
    "Light → electrical data",
    "Lumière → données électriques"
  ],
  [
    "Electrical data → light",
    "Données électriques → lumière"
  ],
  [
    "Rear · female MMC",
    "Arrière · MMC femelle"
  ],
  [
    "Incoming MMC",
    "MMC entrant"
  ],
  [
    "Front · male MMC",
    "Avant · MMC mâle"
  ],
  [
    "Onward MMC",
    "MMC sortant"
  ],
  [
    "LC fanout side",
    "Côté fanout LC"
  ],
  [
    "From {0}",
    "Depuis {0}"
  ],
  [
    "Onward fiber",
    "Fibre sortante"
  ],
  [
    "Next fiber section",
    "Tronçon de fibre suivant"
  ],
  [
    "Enlarged connection · light passes through",
    "Connexion agrandie · la lumière traverse"
  ],
  [
    "Your viewpoint",
    "Votre point de vue"
  ],
  [
    "Choose the local device",
    "Choisir l’équipement local"
  ],
  [
    "At device A",
    "Chez l’équipement A"
  ],
  [
    "At device B",
    "Chez l’équipement B"
  ],
  [
    "Follow the data",
    "Suivre les données"
  ],
  [
    "Light direction",
    "Sens de la lumière"
  ],
  [
    "Follow light",
    "Suivre la lumière"
  ],
  [
    "← Back",
    "← Retour"
  ],
  [
    "Next →",
    "Suivant →"
  ],
  [
    "Enlarge map",
    "Agrandir le plan"
  ],
  [
    "Example route across two rooms. Scroll horizontally when enlarged.",
    "Parcours d’exemple entre deux salles. Faites défiler horizontalement après agrandissement."
  ],
  [
    "Yellow: fiber · Blue / teal: invisible IR · Purple: electrical data",
    "Jaune : fibre · Bleu / turquoise : IR invisible · Violet : données électriques"
  ],
  [
    "Explore each connection",
    "Explorer chaque connexion"
  ],
  [
    "One mapped strand is highlighted at a time. Both devices can transmit at once on separate strands. The other fanout legs are omitted for clarity. Rear/front geometry is opened out in the close-up; the overview shows connection order.",
    "Une fibre attribuée est mise en évidence à la fois. Les deux équipements peuvent émettre simultanément sur des fibres séparées. Les autres branches sont masquées pour plus de clarté. Le détail sépare les faces arrière et avant ; la vue générale montre l’ordre des connexions."
  ],
  [
    "{0} TX through rack CAS, distribution CAS and room passage, across rooms, through three more passives to {1} RX.",
    "TX de {0} traverse le CAS de baie, le CAS de distribution et le passage entre salles, puis trois autres passifs jusqu’à RX de {1}."
  ],
  [
    "Step {0} of {1}",
    "Étape {0} sur {1}"
  ],
  [
    "{0} is local; {1} is remote. Following {2} TX → {3} RX. {4}.",
    "{0} est local ; {1} est distant. Suivi de {2} TX → {3} RX. {4}."
  ],
  [
    "Pause journey",
    "Suspendre le parcours"
  ],
  [
    "Fit full route",
    "Afficher tout le parcours"
  ],
  [
    "Optics, fiber & light",
    "Optiques, fibre et lumière"
  ],
  [
    "Know the parts → read the light → check the path",
    "Connaître les pièces → lire la lumière → vérifier le chemin"
  ],
  [
    "Know the parts",
    "Connaître les pièces"
  ],
  [
    "Optics, TX / RX & VFL",
    "Optiques, TX / RX et VFL"
  ],
  [
    "Fiber, LC & the passive path",
    "Fibre, LC et chemin passif"
  ],
  [
    "From device data to light",
    "Des données à la lumière"
  ],
  [
    "Read the light",
    "Lire la lumière"
  ],
  [
    "Power readings & allowed limits",
    "Mesures de puissance et limites autorisées"
  ],
  [
    "Polarity: connect TX to RX",
    "Polarité : connecter TX à RX"
  ],
  [
    "Check the path",
    "Vérifier le chemin"
  ],
  [
    "LC & MMC loopbacks",
    "Boucles LC et MMC"
  ],
  [
    "Use loops to narrow the problem",
    "Utiliser les boucles pour isoler le problème"
  ],
  [
    "Dirt, seating & tight bends",
    "Saleté, enclenchement et courbures serrées"
  ],
  [
    "Ferrules, fiber & splice faults",
    "Férules, fibre et défauts d’épissure"
  ],
  [
    "Make one change, then retest",
    "Changer une chose, puis retester"
  ],
  [
    "Trace with red VFL light",
    "Tracer avec la lumière rouge du VFL"
  ],
  [
    "Continuity versus optical loss",
    "Continuité et perte optique"
  ],
  [
    "How devices communicate",
    "Comment les équipements communiquent"
  ],
  [
    "Find the device → follow the route → confirm the endpoints",
    "Trouver l’équipement → suivre le chemin → confirmer les extrémités"
  ],
  [
    "Locate & connect",
    "Localiser et raccorder"
  ],
  [
    "Read a rack position",
    "Lire une position en baie"
  ],
  [
    "Local, remote & the chain of passives",
    "Local, distant et chaîne de passifs"
  ],
  [
    "See the same path from either end",
    "Voir le même chemin depuis chaque extrémité"
  ],
  [
    "Confirm the device and ports",
    "Confirmer l’équipement et les ports"
  ],
  [
    "LLDP: did I connect to the right device?",
    "LLDP : suis-je connecté au bon équipement ?"
  ],
  [
    "FIM & patching",
    "FIM et raccordement"
  ],
  [
    "Read the assignment → choose the position → match the connections",
    "Lire l’affectation → choisir la position → vérifier les connexions"
  ],
  [
    "Map & patch",
    "Repérer et raccorder"
  ],
  [
    "Read the FIM connection assignment",
    "Lire l’affectation de connexion FIM"
  ],
  [
    "Choose the LC optic position",
    "Choisir la position LC sur l’optique"
  ],
  [
    "Follow the fiber inside the rack",
    "Suivre la fibre dans la baie"
  ],
  [
    "Match the MMC head & followers",
    "Associer la tête MMC et ses branches"
  ],
  [
    "Work through a complete ticket",
    "Suivre un ordre de raccordement complet"
  ],
  [
    "The optic carries device data as infrared light. A VFL supplies separate red light for tracing.",
    "L’optique transporte les données de l’équipement sous forme de lumière infrarouge. Le VFL fournit une lumière rouge distincte pour le traçage."
  ],
  [
    "Devices exchange data; their optics convert it. The fiber and passives carry the light between them.",
    "Les équipements échangent des données ; leurs optiques les convertissent. La fibre et les passifs transportent la lumière entre eux."
  ],
  [
    "A loopback checks the return path up to its location. Anything beyond that point is still untested.",
    "Une boucle vérifie le chemin de retour jusqu’à son emplacement. Tout ce qui suit reste non testé."
  ],
  [
    "Record the reading, change one thing, then retest. An improvement is not the same as a verified repair.",
    "Notez la mesure, changez une seule chose, puis retestez. Une amélioration ne vaut pas une réparation vérifiée."
  ],
  [
    "Read the whole location: building, room, row, rack and elevation each narrow the search.",
    "Lisez tout l’emplacement : bâtiment, salle, rangée, baie et hauteur réduisent chacun la recherche."
  ],
  [
    "Follow every mapped passive between the devices. Local and remote each have a sending and a receiving path.",
    "Suivez chaque passif attribué entre les équipements. Chaque extrémité a un chemin d’émission et un chemin de réception."
  ],
  [
    "Changing your viewpoint swaps the names local and remote, not the job of TX or RX.",
    "Changer de point de vue inverse les noms local et distant, pas le rôle de TX ou RX."
  ],
  [
    "Follow the assigned LC leg from the optic to its MMC head and CAS port.",
    "Suivez la branche LC attribuée depuis l’optique jusqu’à sa tête MMC et son port CAS."
  ],
  [
    "Match location, optic orientation, follower, head and CAS port together, then verify health.",
    "Vérifiez ensemble emplacement, orientation de l’optique, branche, tête et port CAS, puis contrôlez le fonctionnement."
  ],
  [
    "Continue learning",
    "Continuer l’apprentissage"
  ],
  [
    "Start learning",
    "Commencer l’apprentissage"
  ],
  [
    "Start chapter {4}",
    "Commencer le chapitre {4}"
  ],
  [
    "Your learning path",
    "Votre parcours d’apprentissage"
  ],
  [
    "Start with the parts, follow the connections, then practice patching. Choose a chapter or continue where you left off.",
    "Découvrez les pièces, suivez les connexions, puis pratiquez le raccordement. Choisissez un chapitre ou reprenez là où vous en étiez."
  ],
  [
    "Close contents",
    "Fermer le sommaire"
  ],
  [
    "Table of contents",
    "Sommaire"
  ],
  [
    "Quick reference",
    "Référence rapide"
  ],
  [
    "Dotted-underlined terms open a definition. Your place is saved on this device.",
    "Les termes soulignés en pointillé ouvrent une définition. Votre position est enregistrée sur cet appareil."
  ],
  [
    "Chapter {0} of {1}",
    "Chapitre {0} sur {1}"
  ],
  [
    "Contents ↑",
    "Sommaire ↑"
  ],
  [
    "Reference",
    "Référence"
  ],
  [
    "Continue → {0}",
    "Continuer → {0}"
  ],
  [
    "Scenario evidence",
    "Éléments du scénario"
  ],
  [
    "You are here",
    "Vous êtes ici"
  ],
  [
    "Mapped passives",
    "Passifs attribués"
  ],
  [
    "Two device optics and separate paths: A TX to B RX, B TX to A RX.",
    "Deux optiques et des chemins séparés : A TX vers B RX, B TX vers A RX."
  ],
  [
    "Local optic with a passed direct loop.",
    "Optique locale avec boucle directe réussie."
  ],
  [
    "CAS {0}, port 12",
    "CAS {0}, port 12"
  ],
  [
    "Loop: {3}",
    "Boucle : {3}"
  ],
  [
    "Same pair · valid test setups · no other changes",
    "Même couple · montages valides · aucun autre changement"
  ],
  [
    "Direct loop: pass",
    "Boucle directe : réussie"
  ],
  [
    "Beyond CAS 2 and the remote device: not tested.",
    "Après CAS 2 et équipement distant : non testés."
  ],
  [
    "Isolated VFL trace",
    "Traçage VFL isolé"
  ],
  [
    "Expected port + strand",
    "Port et fibre attendus"
  ],
  [
    "Restored service RX",
    "RX après remise en service"
  ],
  [
    "Example RX limits",
    "Limites RX d’exemple"
  ],
  [
    "−3.00 to +3.00 dBm",
    "−3.00 à +3.00 dBm"
  ],
  [
    "Expected port",
    "Port attendu"
  ],
  [
    "Red VFL light was detected at the expected destination during the isolated trace.",
    "La lumière rouge du VFL a été détectée à la destination attendue pendant le traçage isolé."
  ],
  [
    "MMC loop",
    "Boucle MMC"
  ],
  [
    "Pass · within limits",
    "Réussi · dans les limites"
  ],
  [
    "−40 · no light reported",
    "−40 · aucune lumière signalée"
  ],
  [
    "End-to-end pairing",
    "Appariement de bout en bout"
  ],
  [
    "Not verified",
    "Non vérifié"
  ],
  [
    "Direct optic loop",
    "Boucle directe sur l’optique"
  ],
  [
    "Pass on the tested pair",
    "Réussite sur le couple testé"
  ],
  [
    "External mapped path",
    "Chemin externe attribué"
  ],
  [
    "One channel fails",
    "Un canal échoue"
  ],
  [
    "Other channels work · cause on this path unknown",
    "Les autres canaux fonctionnent · cause inconnue sur ce chemin"
  ],
  [
    "MMC head with evidence of one failed mapped channel; no physical defect is identified in the picture.",
    "Tête MMC avec un canal attribué défaillant ; l’image n’identifie aucun défaut physique."
  ],
  [
    "Before · RX",
    "Avant · RX"
  ],
  [
    "After · RX",
    "Après · RX"
  ],
  [
    "Bend widened + connector reseated",
    "Courbure élargie + connecteur réenclenché"
  ],
  [
    "No reading between these two changes",
    "Aucune mesure entre ces deux changements"
  ],
  [
    "Example RX limits: −3.00 to +3.00 dBm. Other required lanes and link status: not checked.",
    "Limites RX d’exemple : −3.00 à +3.00 dBm. Autres canaux requis et état de liaison : non vérifiés."
  ],
  [
    "At A",
    "Chez A"
  ],
  [
    "Device + installed optic",
    "Équipement + optique installée"
  ],
  [
    "Between devices",
    "Entre équipements"
  ],
  [
    "Fiber → CAS 1 → CAS 2 → fiber",
    "Fibre → CAS 1 → CAS 2 → fibre"
  ],
  [
    "At B",
    "Chez B"
  ],
  [
    "Installed optic + device",
    "Optique installée + équipement"
  ],
  [
    "Device A is sending data to Device B",
    "L’équipement A envoie des données à B"
  ],
  [
    "B · local TX",
    "B · TX local"
  ],
  [
    "Within limits",
    "Dans les limites"
  ],
  [
    "B · local RX",
    "B · RX local"
  ],
  [
    "A’s current readings",
    "Mesures actuelles de A"
  ],
  [
    "Not available",
    "Indisponibles"
  ],
  [
    "Arrows show the intended directions, not confirmed light arrival.",
    "Les flèches montrent les sens prévus, pas une arrivée de lumière confirmée."
  ],
  [
    "Optic 7 · purple tab below",
    "Optique 7 · languette violette en bas"
  ],
  [
    "Destination cassette",
    "Cassette de destination"
  ],
  [
    "Mock ticket calls for Ethernet 7/5, leg 8, CAS 2 port 28. Optic is flipped with purple tab below.",
    "L’ordre fictif demande Ethernet 7/5, branche 8, CAS 2 port 28. L’optique est retournée, languette violette en bas."
  ],
  [
    "Position",
    "Position"
  ],
  [
    "Follower",
    "Branche"
  ],
  [
    "Leg 8",
    "Branche 8"
  ],
  [
    "Head",
    "Tête"
  ],
  [
    "Destination",
    "Destination"
  ],
  [
    "CAS 2 / Port 28",
    "CAS 2 / Port 28"
  ],
  [
    "Leg 3: dark",
    "Branche 3 : sans lumière"
  ],
  [
    "Leg 8: works",
    "Branche 8 : fonctionne"
  ],
  [
    "Two separate paths shown from the same fanout",
    "Deux chemins séparés du même fanout"
  ],
  [
    "Separate leg 3 and leg 8 paths join the same MMC assembly. Leg 3 is dark; leg 8 works.",
    "Les branches 3 et 8 suivent des chemins séparés dans le même ensemble MMC. La branche 3 est sans lumière ; la 8 fonctionne."
  ],
  [
    "Head serial S747885346FWL · 12 followers",
    "N° de tête S747885346FWL · 12 branches"
  ],
  [
    "FIM assigns the affected optic to leg 3. No mapping change is authorized.",
    "FIM attribue l’optique concernée à la branche 3. Aucun changement d’affectation n’est autorisé."
  ],
  [
    "Local device · reported values",
    "Équipement local · valeurs signalées"
  ],
  [
    "Source state and end-to-end pairing have not yet been verified.",
    "L’état de la source et l’appariement de bout en bout restent à vérifier."
  ],
  [
    "Optic",
    "Optique"
  ],
  [
    "Loop the optic",
    "Boucler l’optique"
  ],
  [
    "Plug the LC loopback into the optic.",
    "Insérez la boucle LC dans l’optique."
  ],
  [
    "RX within range on every tested lane?",
    "RX dans la plage sur chaque canal testé ?"
  ],
  [
    "Optic + patch",
    "Optique + raccordement"
  ],
  [
    "Loop at the passive",
    "Boucler au passif"
  ],
  [
    "Fit the MMC loopback at the next reachable mapped passive, e.g. CAS 1 Port 12.",
    "Installez la boucle MMC au prochain passif attribué accessible, par exemple CAS 1 port 12."
  ],
  [
    "Move the loop to the optic",
    "Déplacer la boucle sur l’optique"
  ],
  [
    "Fit the LC loopback directly at the optic, bypassing the MMC leader and LC legs.",
    "Installez la boucle LC directement sur l’optique, en excluant la tête MMC et les branches LC."
  ],
  [
    "Does the direct loop pass?",
    "La boucle directe réussit-elle ?"
  ],
  [
    "Clean and reseat the test connections",
    "Nettoyer et réenclencher les connexions de test"
  ],
  [
    "Inspect, clean and reinspect. Check mapping and RX limits, then retry the LC loop.",
    "Inspectez, nettoyez et inspectez de nouveau. Vérifiez l’affectation et les limites RX, puis refaites la boucle LC."
  ],
  [
    "Does the direct loop now pass?",
    "La boucle directe réussit-elle maintenant ?"
  ],
  [
    "Try a known-good optic",
    "Essayer une optique de référence fonctionnelle"
  ],
  [
    "Keep the same validated LC loopback and port.",
    "Conservez la même boucle LC validée et le même port."
  ],
  [
    "Does the known-good optic pass?",
    "L’optique de référence réussit-elle ?"
  ],
  [
    "Check the path to this passive",
    "Vérifier le chemin jusqu’à ce passif"
  ],
  [
    "Check mapped ports, leader/legs, seating, dirt and bends. Retry the MMC loop.",
    "Vérifiez ports attribués, tête / branches, enclenchement, saleté et courbures. Refaites la boucle MMC."
  ],
  [
    "Does the passive loop now pass?",
    "La boucle au passif réussit-elle maintenant ?"
  ],
  [
    "Local check",
    "Contrôle local"
  ],
  [
    "Local loop passed",
    "Boucle locale réussie"
  ],
  [
    "The optic and tested path passed to this loop point. Keep going through the passives you can reach.",
    "L’optique et le chemin testé ont réussi jusqu’à ce point de boucle. Continuez par les passifs accessibles."
  ],
  [
    "Another accessible passive to loop?",
    "Un autre passif accessible à boucler ?"
  ],
  [
    "Fiber",
    "Fibre"
  ],
  [
    "Check the fiber you can access",
    "Vérifier la fibre accessible"
  ],
  [
    "Use VFL only on a segment disconnected from active equipment at both ends.",
    "Utilisez le VFL uniquement sur un tronçon déconnecté des équipements actifs aux deux extrémités."
  ],
  [
    "Can you isolate and trace a segment?",
    "Pouvez-vous isoler et tracer un tronçon ?"
  ],
  [
    "VFL the next fiber segment",
    "Tracer le tronçon suivant au VFL"
  ],
  [
    "Trace the isolated segment to the exact port and strand in your layout.",
    "Tracez le tronçon isolé jusqu’au port et à la fibre exacts du plan."
  ],
  [
    "Light at the expected port and strand?",
    "Lumière au port et sur la fibre attendus ?"
  ],
  [
    "Disconnect active equipment at both ends before using VFL.",
    "Déconnectez les équipements actifs aux deux extrémités avant d’utiliser le VFL."
  ],
  [
    "Check nearby ports and LC legs",
    "Vérifier les ports et branches LC voisins"
  ],
  [
    "Compare where the light appears with the intended route and leader group.",
    "Comparez l’endroit où apparaît la lumière au chemin prévu et au groupe de la tête."
  ],
  [
    "Light at a different port or leg?",
    "Lumière sur un autre port ou une autre branche ?"
  ],
  [
    "Correct the misport or polarity",
    "Corriger le port ou la polarité"
  ],
  [
    "Follow the port and lane map, then repeat the VFL trace.",
    "Suivez le plan des ports et canaux, puis refaites le traçage VFL."
  ],
  [
    "Light at the correct port now?",
    "Lumière sur le bon port maintenant ?"
  ],
  [
    "Check this segment",
    "Vérifier ce tronçon"
  ],
  [
    "Check seating, dirty ends, tight bends and damage. Correct any finding; retrace.",
    "Vérifiez enclenchement, extrémités sales, courbures serrées et dommages. Corrigez les défauts constatés ; retracez."
  ],
  [
    "Does this segment trace correctly now?",
    "Le traçage de ce tronçon est-il correct maintenant ?"
  ],
  [
    "Follow the accessible route",
    "Suivre le parcours accessible"
  ],
  [
    "Continue through the passive hops you can reach. Leave inaccessible sections unverified.",
    "Continuez par les passifs accessibles. Laissez les sections inaccessibles non vérifiées."
  ],
  [
    "All accessible segments traced?",
    "Tous les tronçons accessibles sont-ils tracés ?"
  ],
  [
    "Local health",
    "État local"
  ],
  [
    "Reconnect and check local health",
    "Reconnecter et vérifier l’état local"
  ],
  [
    "Remove test gear. Restore the mapped TX-to-RX path and read health at your local optic.",
    "Retirez le matériel de test. Rétablissez le chemin TX–RX attribué et consultez les mesures de l’optique locale."
  ],
  [
    "Local RX/TX in range and link stable?",
    "RX/TX locaux dans la plage et liaison stable ?"
  ],
  [
    "Recheck after tracing",
    "Revérifier après le traçage"
  ],
  [
    "Remove the VFL. Restore the mapped TX-to-RX path and read health at your local optic.",
    "Retirez le VFL. Rétablissez le chemin TX–RX attribué et consultez les mesures de l’optique locale."
  ],
  [
    "Check loss on the tested section",
    "Vérifier la perte sur la section testée"
  ],
  [
    "A VFL trace shows the route. A loss test checks attenuation.",
    "Un traçage VFL montre le chemin. Un test de perte mesure l’atténuation."
  ],
  [
    "Can you run a referenced loss test here?",
    "Pouvez-vous effectuer ici un test de perte avec référence ?"
  ],
  [
    "Measure the fiber loss",
    "Mesurer la perte de la fibre"
  ],
  [
    "Use a referenced loss test at the operating wavelength.",
    "Utilisez un test de perte avec référence à la longueur d’onde de fonctionnement."
  ],
  [
    "Loss within the link budget?",
    "Perte dans le budget optique ?"
  ],
  [
    "VFL continuity alone does not establish acceptable loss.",
    "La continuité VFL seule ne prouve pas une perte acceptable."
  ],
  [
    "Original optic or mating connection suspect",
    "Optique d’origine ou connexion de contact suspecte"
  ],
  [
    "The replacement passed. Inspect the interface, replace as needed and recheck health.",
    "Le remplacement a réussi. Inspectez l’interface, remplacez si nécessaire et revérifiez les mesures."
  ],
  [
    "Check the port or loop setup",
    "Vérifier le port ou le montage de boucle"
  ],
  [
    "The known-good optic also failed. Confirm compatibility, mapping and the host port.",
    "L’optique de référence a aussi échoué. Confirmez compatibilité, affectation et port de l’équipement hôte."
  ],
  [
    "Suspect the fiber to this loop point",
    "Suspecter la fibre jusqu’à ce point de boucle"
  ],
  [
    "Direct loop passed; passive loop failed. Start beyond the last passing loop point: verify the map and test that section.",
    "Boucle directe réussie ; boucle au passif échouée. Commencez après le dernier point réussi : vérifiez le plan et testez cette section."
  ],
  [
    "Port or polarity mismatch remains",
    "Erreur de port ou de polarité toujours présente"
  ],
  [
    "Reconcile the observed VFL port with the intended map before continuing.",
    "Faites correspondre le port observé au VFL avec le plan prévu avant de continuer."
  ],
  [
    "Suspect this fiber segment or connection",
    "Tronçon de fibre ou connexion suspect"
  ],
  [
    "Verify the VFL setup, compare a known-good jumper and test the segment for loss or a break.",
    "Vérifiez le montage VFL, comparez un cordon de référence et recherchez une perte ou une rupture sur le tronçon."
  ],
  [
    "Excessive fiber loss",
    "Perte excessive dans la fibre"
  ],
  [
    "Locate the loss: connectors, seating, bends, damaged fiber or splices. Correct it and retest.",
    "Localisez la perte : connecteurs, enclenchement, courbures, fibre endommagée ou épissures. Corrigez et retestez."
  ],
  [
    "Tested section passed",
    "Section testée réussie"
  ],
  [
    "Check local compatibility and port settings. Request checks beyond the tested section, including the remote end.",
    "Vérifiez la compatibilité locale et la configuration du port. Demandez des contrôles au-delà de la section testée, y compris à l’extrémité distante."
  ],
  [
    "Local checks complete; rest unverified",
    "Contrôles locaux terminés ; reste non vérifié"
  ],
  [
    "Record the farthest passing loop point. Request checks of the remaining fiber and remote optic.",
    "Notez le point de boucle réussi le plus éloigné. Demandez le contrôle de la fibre restante et de l’optique distante."
  ],
  [
    "Local health restored",
    "Fonctionnement local rétabli"
  ],
  [
    "Local readings and link look good. Record the readings and farthest loop point tested.",
    "Les mesures locales et la liaison semblent bonnes. Notez les mesures et le point de boucle testé le plus éloigné."
  ],
  [
    "Choose Yes or No.",
    "Choisissez Oui ou Non."
  ],
  [
    "Learning resources",
    "Ressources pédagogiques"
  ],
  [
    "Learn",
    "Apprendre"
  ],
  [
    "Learn · Fiber Optics Fundamentals",
    "Apprendre · Fondamentaux de la fibre optique"
  ],
  [
    "Simulations · hands-on practice",
    "Simulations · pratique interactive"
  ],
  [
    "Exams",
    "Examens"
  ],
  [
    "My progress",
    "Ma progression"
  ],
  [
    "Troubleshoot",
    "Dépanner"
  ],
  [
    "Chapter 1",
    "Chapitre 1"
  ],
  [
    "Follow the light from the optic, through the fiber, to the test.",
    "Suivez la lumière depuis l’optique, à travers la fibre, jusqu’au test."
  ],
  [
    "In this chapter",
    "Dans ce chapitre"
  ],
  [
    "Light sources",
    "Sources de lumière"
  ],
  [
    "Fiber path",
    "Chemin de fibre"
  ],
  [
    "Device communication",
    "Communication des équipements"
  ],
  [
    "Loopbacks",
    "Boucles de retour"
  ],
  [
    "Reading limits",
    "Lire les limites"
  ],
  [
    "Compare tests",
    "Comparer les tests"
  ],
  [
    "Polarity",
    "Polarité"
  ],
  [
    "Faults",
    "Défauts"
  ],
  [
    "VFL tracing",
    "Traçage VFL"
  ],
  [
    "Two light sources, different jobs",
    "Deux sources de lumière, deux fonctions"
  ],
  [
    "Optic · infrared",
    "Optique · infrarouge"
  ],
  [
    "Converts device data into light.",
    "Convertit les données de l’équipement en lumière."
  ],
  [
    "TX sends. RX receives.",
    "TX émet. RX reçoit."
  ],
  [
    "Invisible to your eyes · blue is illustrative",
    "Invisible à l’œil · le bleu est illustratif"
  ],
  [
    "VFL · visible red",
    "VFL · rouge visible"
  ],
  [
    "A separate tool sends red light into",
    "Un outil indépendant envoie de la lumière rouge dans une"
  ],
  [
    "isolated fiber",
    "fibre isolée"
  ],
  [
    "to trace it.",
    "pour la tracer."
  ],
  [
    "Visible red · does not carry network data",
    "Rouge visible · ne transporte pas de données réseau"
  ],
  [
    "The glow marks the source; arrows show where its light goes. Blue/teal represents invisible IR. Red represents VFL light. Fiber does not normally glow along its jacket.",
    "La lueur indique la source ; les flèches montrent le chemin de sa lumière. Le bleu / turquoise représente l’IR invisible. Le rouge représente le VFL. La gaine de la fibre ne brille normalement pas sur sa longueur."
  ],
  [
    "The fiber carries the light",
    "La fibre transporte la lumière"
  ],
  [
    "In your layout: LC followers join an MMC leader at the passive.",
    "Dans votre installation : les branches LC rejoignent une tête MMC au passif."
  ],
  [
    "See this fiber path inside a rack →",
    "Voir ce chemin de fibre dans une baie →"
  ],
  [
    "A passive routes light; it does not make it. Follow the mapped port, strand and TX → RX pairing.",
    "Un passif achemine la lumière ; il ne la produit pas. Suivez le port, la fibre et l’appariement TX → RX attribués."
  ],
  [
    "How two devices communicate through fiber",
    "Comment deux équipements communiquent par fibre"
  ],
  [
    "Device A’s data → optic → fiber and CAS connections → optic → Device B.",
    "Données de A → optique → fibre et connexions CAS → optique → équipement B."
  ],
  [
    "This is a simplified overview.",
    "Voici une vue d’ensemble simplifiée."
  ],
  [
    "Follow the full example through rack, distribution and room-passage passives in Chapter 2 →",
    "Suivre l’exemple complet par les passifs de baie, de distribution et de passage entre salles au chapitre 2 →"
  ],
  [
    "Bring TX light back to RX",
    "Renvoyer la lumière TX vers RX"
  ],
  [
    "Move the loop to see what you are testing.",
    "Déplacez la boucle pour voir ce que vous testez."
  ],
  [
    "your good example",
    "votre bon exemple"
  ],
  [
    "your no-light indication",
    "votre indication d’absence de lumière"
  ],
  [
    "dBm examples. Check every lane against the optic’s limits. Use the correct loop mapping and any required attenuation.",
    "Exemples en dBm. Comparez chaque canal aux limites de l’optique. Utilisez l’affectation de boucle correcte et l’atténuation requise."
  ],
  [
    "What can interrupt the light?",
    "Qu’est-ce qui peut interrompre la lumière ?"
  ],
  [
    "Change the connection to see a possible effect.",
    "Modifiez la connexion pour voir un effet possible."
  ],
  [
    "Isolate → inspect → clean if needed → inspect again → seat fully. Keep bends within the cable’s allowed radius.",
    "Isoler → inspecter → nettoyer si nécessaire → inspecter à nouveau → enclencher complètement. Respectez le rayon de courbure autorisé du câble."
  ],
  [
    "Follow red light to the next passive",
    "Suivre la lumière rouge jusqu’au passif suivant"
  ],
  [
    "Isolate both ends of the accessible section from active equipment. Connect the VFL with the correct adapter.",
    "Isolez les deux extrémités de la section accessible des équipements actifs. Raccordez le VFL avec le bon adaptateur."
  ],
  [
    "VFL helps trace continuity and mapping. Measure optical loss separately with a source and power meter or loss test set.",
    "Le VFL aide à tracer la continuité et l’affectation. Mesurez la perte optique séparément avec une source et un photomètre ou un ensemble de test de perte."
  ],
  [
    "References:",
    "Références :"
  ],
  [
    "Fluke: light sources & tracing",
    "Fluke : sources de lumière et traçage"
  ],
  [
    "Cisco: inspection & cleaning",
    "Cisco : inspection et nettoyage"
  ],
  [
    "Cisco: optic health",
    "Cisco : état de l’optique"
  ],
  [
    "US Conec: MMC mapping",
    "US Conec : affectation MMC"
  ],
  [
    "Optic infrared light",
    "Lumière infrarouge de l’optique"
  ],
  [
    "Visible red VFL light",
    "Lumière rouge visible du VFL"
  ],
  [
    "Fiber route",
    "Parcours de fibre"
  ],
  [
    "Loop location",
    "Emplacement de la boucle"
  ],
  [
    "LC at optic",
    "LC sur l’optique"
  ],
  [
    "MMC at passive",
    "MMC au passif"
  ],
  [
    "Connection condition",
    "État de la connexion"
  ],
  [
    "Clean",
    "Propre"
  ],
  [
    "Dirty",
    "Sale"
  ],
  [
    "Unseated",
    "Mal enclenché"
  ],
  [
    "Tight bend",
    "Courbure serrée"
  ],
  [
    "VFL observation",
    "Observation VFL"
  ],
  [
    "Light seen",
    "Lumière visible"
  ],
  [
    "No light",
    "Aucune lumière"
  ],
  [
    "Play animation",
    "Lancer l’animation"
  ],
  [
    "Pause animation",
    "Suspendre l’animation"
  ],
  [
    "Play all animations",
    "Lancer toutes les animations"
  ],
  [
    "Pause all animations",
    "Suspendre toutes les animations"
  ],
  [
    "IR carries data. The receiver turns arriving light back into electrical data.",
    "L’IR transporte des données. Le récepteur reconvertit la lumière reçue en données électriques."
  ],
  [
    "Each optic’s TX starts its own light.",
    "Le TX de chaque optique produit sa propre lumière."
  ],
  [
    "The other optic’s RX receives it.",
    "Le RX de l’autre optique la reçoit."
  ],
  [
    "Red light can be detected at the test end using the site’s safe viewing method.",
    "La lumière rouge peut être détectée à l’extrémité testée avec la méthode d’observation sûre du site."
  ],
  [
    "VFL light starts here",
    "La lumière VFL commence ici"
  ],
  [
    "Isolated fiber",
    "Fibre isolée"
  ],
  [
    "Active equipment disconnected",
    "Équipement actif déconnecté"
  ],
  [
    "TX starts at the optic → LC follower → MMC head → CAS → onward fiber. The separate RX path carries light from the remote optic. One pair shown; follow the full lane map in FIM.",
    "TX commence à l’optique → branche LC → tête MMC → CAS → fibre sortante. Le chemin RX séparé transporte la lumière de l’optique distante. Un couple est montré ; suivez le plan complet des canaux dans FIM."
  ],
  [
    "MMC loop at CAS 1 Port 12: tests the optic + fiber to this port. Beyond the loop is untested. One pair illustrated.",
    "Boucle MMC sur CAS 1 port 12 : teste l’optique et la fibre jusqu’à ce port. La suite n’est pas testée. Un couple est illustré."
  ],
  [
    "LC loop inserted: TX returns to RX at the optic. The longer fiber route is outside this test.",
    "Boucle LC insérée : TX revient vers RX sur l’optique. Le long chemin de fibre est exclu de ce test."
  ],
  [
    "Clean and seated: light can couple across the connection.",
    "Propre et enclenché : la lumière peut traverser la connexion."
  ],
  [
    "Dirt at the core can block or scatter light. Clean, then inspect again.",
    "La saleté sur le cœur peut bloquer ou diffuser la lumière. Nettoyez, puis inspectez à nouveau."
  ],
  [
    "A connector that is not fully seated can cause loss or no light. Check the latch.",
    "Un connecteur mal enclenché peut causer une perte ou une absence de lumière. Vérifiez le verrouillage."
  ],
  [
    "An overly tight bend can let light escape from the core, reducing received power.",
    "Une courbure trop serrée peut laisser la lumière sortir du cœur et réduire la puissance reçue."
  ],
  [
    "Fiber side view · exaggerated",
    "Vue latérale de fibre · exagérée"
  ],
  [
    "Connection close-up · enlarged",
    "Détail de connexion · agrandi"
  ],
  [
    "TX light arrives from the optic →",
    "La lumière TX arrive de l’optique →"
  ],
  [
    "Light lost",
    "Lumière perdue"
  ],
  [
    "at the bend",
    "dans la courbure"
  ],
  [
    "Gap",
    "Écart"
  ],
  [
    "End face under a scope",
    "Face terminale au microscope"
  ],
  [
    "Debris covers the core",
    "Des débris couvrent le cœur"
  ],
  [
    "Core is clear",
    "Le cœur est dégagé"
  ],
  [
    "Red at the expected port: this section has continuity. Continue to the next accessible section.",
    "Rouge au port attendu : ce tronçon est continu. Passez à la section accessible suivante."
  ],
  [
    "Expected port is dark: check the VFL setup, both connections and this span. The fault location is not yet known.",
    "Port attendu sans lumière : vérifiez le montage VFL, les deux connexions et ce tronçon. La panne n’est pas encore localisée."
  ],
  [
    "Red at another port: check the mapped route, strand and polarity before continuing.",
    "Rouge sur un autre port : vérifiez le chemin attribué, la fibre et la polarité avant de continuer."
  ],
  [
    "Example: expected 12 · other 13",
    "Exemple : attendu 12 · autre 13"
  ],
  [
    "Optic disconnected",
    "Optique déconnectée"
  ],
  [
    "Isolated section",
    "Section isolée"
  ],
  [
    "VFL starts here",
    "Le VFL commence ici"
  ],
  [
    "Light reaches port 12 ✓",
    "La lumière atteint le port 12 ✓"
  ],
  [
    "Light reaches port 13 · check mapping",
    "La lumière atteint le port 13 · vérifier l’affectation"
  ],
  [
    "Port 12 dark · location unknown",
    "Port 12 sans lumière · panne non localisée"
  ],
  [
    "Chapter 2",
    "Chapitre 2"
  ],
  [
    "Find the device. Confirm the port. Follow its connection.",
    "Trouvez l’équipement. Confirmez le port. Suivez sa connexion."
  ],
  [
    "Read the position",
    "Lire la position"
  ],
  [
    "Local & remote",
    "Local et distant"
  ],
  [
    "Confirm the ports",
    "Confirmer les ports"
  ],
  [
    "LLDP neighbors",
    "Voisins LLDP"
  ],
  [
    "Every part narrows the location",
    "Chaque élément précise l’emplacement"
  ],
  [
    "Tap a part to see where it takes you.",
    "Touchez un élément pour voir où il vous mène."
  ],
  [
    "Parts of the rack position",
    "Éléments de la position en baie"
  ],
  [
    "Building",
    "Bâtiment"
  ],
  [
    "Room",
    "Salle"
  ],
  [
    "Row / front",
    "Rangée / avant"
  ],
  [
    "Elevation",
    "Hauteur"
  ],
  [
    "Your naming format. Drawings are illustrative; use the site labels and layout to locate the actual device.",
    "Votre format de nommage. Les dessins sont illustratifs ; utilisez les étiquettes et le plan du site pour localiser l’équipement réel."
  ],
  [
    "From your rack to the other room",
    "De votre baie à l’autre salle"
  ],
  [
    "The devices exchange data through a chain of fiber connections. Follow the optic’s light through three passives on each side of this example. Local is where you are checking; remote is the other device.",
    "Les équipements échangent des données par une chaîne de connexions de fibre. Suivez la lumière de l’optique à travers trois passifs de chaque côté de cet exemple. Local désigne l’équipement que vous vérifiez ; distant désigne l’autre."
  ],
  [
    "Device A · your example",
    "Équipement A · votre exemple"
  ],
  [
    "Device B · the other end",
    "Équipement B · l’autre extrémité"
  ],
  [
    "Find its own position in the connection record.",
    "Trouvez sa propre position dans le registre de connexions."
  ],
  [
    "A1–A3 and B1–B3, Port 12 and the room layouts are teaching examples. The rear female / front male MMC arrangement at the rack CAS follows your site example; connector gender depends on the assembly. Use FIM and the actual labels for the route, mating connectors and lane map.",
    "A1–A3, B1–B3, le port 12 et les plans de salles sont des exemples pédagogiques. Le MMC femelle arrière / mâle avant du CAS de baie suit votre exemple de site ; le genre du connecteur dépend de l’ensemble. Utilisez FIM et les étiquettes réelles pour le parcours, les connecteurs et les canaux."
  ],
  [
    "Match the device and its port",
    "Identifier l’équipement et son port"
  ],
  [
    "Connection checks",
    "Contrôles de connexion"
  ],
  [
    "Rack position",
    "Position en baie"
  ],
  [
    "Device + exact port",
    "Équipement + port exact"
  ],
  [
    "Optic + mapped passive ports",
    "Optique + ports passifs attribués"
  ],
  [
    "Remote device + exact port",
    "Équipement distant + port exact"
  ],
  [
    "The position tells you where to go. The connection record tells you which ports and passives join the two devices.",
    "La position indique où aller. Le registre de connexions indique quels ports et passifs relient les deux équipements."
  ],
  [
    "Check what you can reach: loop the local optic, then extend through accessible passives. A passing local loop leaves the path beyond it unverified.",
    "Vérifiez ce que vous pouvez atteindre : bouclez l’optique locale, puis étendez le test aux passifs accessibles. Une boucle locale réussie ne vérifie pas la suite du chemin."
  ],
  [
    "Position format and rack connection: your site examples. References:",
    "Format de position et connexion de baie : vos exemples de site. Références :"
  ],
  [
    "Cisco: TX/RX pairing",
    "Cisco : appariement TX/RX"
  ],
  [
    "US Conec: MMC gender and polarity",
    "US Conec : genre MMC et polarité"
  ],
  [
    "QNO5 = building. Start at this building.",
    "QNO5 = bâtiment. Commencez par ce bâtiment."
  ],
  [
    "5C = data hall / room. Find room 5C inside QNO5.",
    "5C = salle informatique. Trouvez la salle 5C dans QNO5."
  ],
  [
    "16f = row 16, front. The f identifies front in your naming format.",
    "16f = rangée 16, avant. Le f désigne l’avant dans votre format de nommage."
  ],
  [
    "17 = rack. Find rack 17 in row 16, at the front.",
    "17 = baie. Trouvez la baie 17 à l’avant de la rangée 16."
  ],
  [
    "30 = elevation. Find the device at elevation 30 in rack 17.",
    "30 = hauteur. Trouvez l’équipement à la hauteur 30 dans la baie 17."
  ],
  [
    "Inside building QNO5",
    "Dans le bâtiment QNO5"
  ],
  [
    "Data hall / room",
    "Salle informatique"
  ],
  [
    "Inside room 5C",
    "Dans la salle 5C"
  ],
  [
    "Row 16",
    "Rangée 16"
  ],
  [
    "f = front",
    "f = avant"
  ],
  [
    "Room 5C · row 16 · front",
    "Salle 5C · rangée 16 · avant"
  ],
  [
    "Rack 17 · front view",
    "Baie 17 · vue avant"
  ],
  [
    "Elevation 30",
    "Hauteur 30"
  ],
  [
    "Device here",
    "Équipement ici"
  ],
  [
    "Rack excerpt",
    "Extrait de baie"
  ],
  [
    "Chapter 3",
    "Chapitre 3"
  ],
  [
    "Match the optic position, the follower and its MMC head.",
    "Associez la position de l’optique, la branche et sa tête MMC."
  ],
  [
    "LC position",
    "Position LC"
  ],
  [
    "Rack view",
    "Vue de baie"
  ],
  [
    "FIM path",
    "Parcours FIM"
  ],
  [
    "MMC head & followers",
    "Tête MMC et branches"
  ],
  [
    "Try the simulation →",
    "Essayer la simulation →"
  ],
  [
    "Same optic. Two LC positions.",
    "Une optique. Deux positions LC."
  ],
  [
    "Choose the Ethernet port shown in FIM.",
    "Choisissez le port Ethernet indiqué dans FIM."
  ],
  [
    "Tab above = upright. Flip the optic and the ports swap sides; their Ethernet numbers stay with them.",
    "Languette en haut = position normale. Retournez l’optique : les ports changent de côté, mais conservent leurs numéros Ethernet."
  ],
  [
    "Your confirmed site example, facing the optic. Check the installed orientation and labels; other hardware may use a different mapping.",
    "Exemple confirmé de votre site, face à l’optique. Vérifiez l’orientation et les étiquettes installées ; un autre matériel peut utiliser une affectation différente."
  ],
  [
    "Find the device. Follow its fiber.",
    "Trouver l’équipement. Suivre sa fibre."
  ],
  [
    "From the optic, up the side manager, to the green CAS.",
    "Depuis l’optique, le long du guide latéral, jusqu’au CAS vert."
  ],
  [
    "Example rack layout. Elevations, CAS 1 / 12 and front/rear routes are teaching examples; confirm the installed path in FIM.",
    "Exemple de baie. Les hauteurs, CAS 1 / 12 et les parcours avant / arrière sont pédagogiques ; confirmez le parcours installé dans FIM."
  ],
  [
    "Follow the LC leg to its passive",
    "Suivre la branche LC jusqu’à son passif"
  ],
  [
    "Use FIM to match the device, Ethernet port, leg ID and passive port.",
    "Utilisez FIM pour associer équipement, port Ethernet, ID de branche et port passif."
  ],
  [
    "The Ethernet number chooses the optic position. FIM tells you which LC follower and MMC passive port belong to that connection.",
    "Le numéro Ethernet détermine la position de l’optique. FIM indique quelle branche LC et quel port passif MMC appartiennent à cette connexion."
  ],
  [
    "Match.",
    "Identifier."
  ],
  [
    "Confirm the device, port and fiber labels against FIM.",
    "Comparez les étiquettes d’équipement, de port et de fibre à FIM."
  ],
  [
    "Inspect.",
    "Inspecter."
  ],
  [
    "Isolate as required, inspect, clean if needed, then inspect again.",
    "Isolez selon la procédure, inspectez, nettoyez si nécessaire, puis inspectez à nouveau."
  ],
  [
    "Seat & check.",
    "Enclencher et vérifier."
  ],
  [
    "Seat the mapped connectors fully. Check optic health in Cable Guy.",
    "Enclenchez complètement les connecteurs attribués. Consultez l’état optique dans Cable Guy."
  ],
  [
    "Moving blue lines illustrate the intended IR path, not a measured result. Use the health check if light is missing.",
    "Les lignes bleues animées illustrent le chemin IR prévu, pas une mesure. Utilisez le diagnostic si la lumière manque."
  ],
  [
    "One MMC head. 12 followers.",
    "Une tête MMC. 12 branches."
  ],
  [
    "The leader/head identifies this fanout. Its 12 legs belong to the same assembly.",
    "La tête identifie ce fanout. Ses 12 branches appartiennent au même ensemble."
  ],
  [
    "Example head serial",
    "Exemple de numéro de tête"
  ],
  [
    "Choose a leg to trace it back to the head.",
    "Choisissez une branche pour la suivre jusqu’à la tête."
  ],
  [
    "One line per leg; individual strands are not shown. Leg numbers are illustration labels—use the actual labels and mapping in FIM.",
    "Une ligne par branche ; les fibres individuelles ne sont pas représentées. Les numéros de branche sont illustratifs : utilisez les étiquettes réelles et l’affectation dans FIM."
  ],
  [
    "A fanout groups separate fiber paths. It does not split one optic’s light among all 12 legs.",
    "Un fanout regroupe des chemins de fibre distincts. Il ne répartit pas la lumière d’une optique entre les 12 branches."
  ],
  [
    "Patch the head into the passive",
    "Raccordez la tête au passif"
  ],
  [
    "The serial identifies the fanout. FIM identifies its destination passive and port. Then match each follower to its assigned optic port.",
    "Le numéro de série identifie le fanout. FIM indique le passif et le port de destination. Associez ensuite chaque branche au port optique prévu."
  ],
  [
    "Practice LC & MMC patching in Simulations →",
    "Entraînez-vous au raccordement LC et MMC dans Simulations →"
  ],
  [
    "Port mapping and fanout: your site examples.",
    "Affectation des ports et fanout : exemples de votre site."
  ],
  [
    "US Conec: MMC alignment & polarity",
    "US Conec : alignement et polarité MMC"
  ],
  [
    "Open Exams →",
    "Ouvrir les examens →"
  ],
  [
    "Check optic / fiber health →",
    "Vérifier l’optique et la fibre →"
  ],
  [
    "Selected LC path to the passive",
    "Chemin LC sélectionné vers le passif"
  ],
  [
    "Choose a fanout follower",
    "Choisissez une branche du fanout"
  ],
  [
    "Leg {0}",
    "Branche {0}"
  ],
  [
    "MMC patching steps",
    "Étapes de raccordement MMC"
  ],
  [
    "1 · Match",
    "1 · Identifier"
  ],
  [
    "2 · Prepare",
    "2 · Préparer"
  ],
  [
    "3 · Seat",
    "3 · Enclencher"
  ],
  [
    "Hands-on practice",
    "Mise en pratique"
  ],
  [
    "Simulations",
    "Simulations"
  ],
  [
    "Move the cable. Match the port. Build confidence on mock hardware.",
    "Déplacez le câble. Trouvez le bon port. Entraînez-vous sur du matériel simulé."
  ],
  [
    "LC & MMC patching",
    "Raccordement LC et MMC"
  ],
  [
    "Read a mock FIM ticket, choose a connector, then drag it to the port—or tap the connector and port. Practice any ticket or take the 5-question exam.",
    "Lisez une fiche FIM simulée, choisissez un connecteur, puis faites-le glisser vers le port, ou touchez le connecteur puis le port. Entraînez-vous sur la fiche de votre choix ou passez l’examen de 5 questions."
  ],
  [
    "Each ticket is a separate training example using your site's 1 / 5 mapping. Matching a port does not prove light or link health. On site: confirm FIM, inspect/clean, seat fully, and check optic health.",
    "Chaque fiche est un exemple indépendant utilisant l’affectation 1 / 5 de votre site. Le bon port ne prouve pas que la lumière passe ni que la liaison fonctionne. Sur site : vérifiez FIM, inspectez/nettoyez, enclenchez complètement et contrôlez l’état optique."
  ],
  [
    "Review Chapter 3: FIM, LC & MMC patching →",
    "Revoir le chapitre 3 : FIM, raccordement LC et MMC →"
  ],
  [
    "Exams →",
    "Examens →"
  ],
  [
    "MMC connection at the CAS",
    "Connexion MMC au CAS"
  ],
  [
    "CAS front",
    "Avant du CAS"
  ],
  [
    "Behind CAS",
    "Arrière du CAS"
  ],
  [
    "Device elevation",
    "Hauteur de l’équipement"
  ],
  [
    "{0} · example",
    "{0} · exemple"
  ],
  [
    "Ethernet port in FIM",
    "Port Ethernet dans FIM"
  ],
  [
    "↻ Flip optic 180°",
    "↻ Retourner l’optique à 180°"
  ],
  [
    "Upside down · tab below",
    "À l’envers · languette en bas"
  ],
  [
    "Upright · tab above",
    "À l’endroit · languette en haut"
  ],
  [
    "Position {1} · {2}",
    "Position {1} · {2}"
  ],
  [
    "Leader / head",
    "Tête / connecteur principal"
  ],
  [
    "Followers",
    "Branches"
  ],
  [
    "Leg {0} belongs to MMC head S747885346FWL. Match this follower’s actual label in FIM.",
    "La branche {0} appartient à la tête MMC S747885346FWL. Vérifiez son étiquette réelle dans FIM."
  ],
  [
    "1. Device {0} sends data through its optic",
    "1. L’équipement {0} envoie des données par son optique"
  ],
  [
    "Device {0} supplies electrical signals to its installed optic. TX converts those signals into infrared light carrying the data.",
    "L’équipement {0} fournit des signaux électriques à son optique. TX les convertit en lumière infrarouge qui transporte les données."
  ],
  [
    "2. Follow the leg up the rack",
    "2. Suivez la branche dans la baie"
  ],
  [
    "The LC follower runs up the cable manager to its MMC head. The head groups the fanout’s fibers; each keeps its own mapped path.",
    "La branche LC remonte le gestionnaire de câbles jusqu’à sa tête MMC. La tête regroupe les fibres du fanout ; chacune conserve son propre chemin prévu."
  ],
  [
    "Through CAS {0}",
    "À travers CAS {0}"
  ],
  [
    "3. The cassette passes the light onward",
    "3. La cassette transmet la lumière"
  ],
  [
    "At the mapped CAS connection, the incoming fiber joins the onward fiber. The passive carries the light without reading the data or producing new light.",
    "Au raccordement CAS prévu, la fibre entrante rejoint la fibre suivante. Le passif transmet la lumière sans lire les données ni produire de nouvelle lumière."
  ],
  [
    "4. Light carries the data between cassettes",
    "4. La lumière transporte les données entre les cassettes"
  ],
  [
    "The onward fiber carries Device {0}’s data as light from CAS {1} to CAS {2}. Follow that mapped route in FIM.",
    "La fibre suivante transporte les données de l’équipement {0} sous forme de lumière de CAS {1} à CAS {2}. Suivez ce chemin dans FIM."
  ],
  [
    "5. Device {0} receives the data",
    "5. L’équipement {0} reçoit les données"
  ],
  [
    "The light reaches the installed optic’s RX. It converts that light back into electrical signals that Device {0} can use.",
    "La lumière atteint RX de l’optique. Celle-ci la reconvertit en signaux électriques utilisables par l’équipement {0}."
  ],
  [
    "Device {0}",
    "Équipement {0}"
  ],
  [
    "RX: light → data",
    "RX : lumière → données"
  ],
  [
    "TX: data → light",
    "TX : données → lumière"
  ],
  [
    "Electrical signals",
    "Signaux électriques"
  ],
  [
    "Light in fiber",
    "Lumière dans la fibre"
  ],
  [
    "LC followers",
    "Branches LC"
  ],
  [
    "From LC / MMC",
    "Depuis LC / MMC"
  ],
  [
    "To onward fiber",
    "Vers la fibre suivante"
  ],
  [
    "CAS {0} · enlarged side view",
    "CAS {0} · vue latérale agrandie"
  ],
  [
    "Fiber between passives",
    "Fibre entre passifs"
  ],
  [
    "Choose which device sends data",
    "Choisissez l’équipement qui envoie les données"
  ],
  [
    "Device A → Device B",
    "Équipement A → Équipement B"
  ],
  [
    "Device B → Device A",
    "Équipement B → Équipement A"
  ],
  [
    "The devices exchange data. Their optics convert it between electrical signals and light.",
    "Les équipements échangent des données. Leurs optiques les convertissent entre signaux électriques et lumière."
  ],
  [
    "Play journey",
    "Lancer le parcours"
  ],
  [
    "Enlarge rack view",
    "Agrandir les baies"
  ],
  [
    "Data between two devices. Scroll horizontally when enlarged.",
    "Données entre deux équipements. Faites défiler horizontalement la vue agrandie."
  ],
  [
    "Electrical data inside the device",
    "Données électriques dans l’équipement"
  ],
  [
    "Data carried as light in fiber",
    "Données transportées par la lumière dans la fibre"
  ],
  [
    "Explore the light path",
    "Explorez le chemin lumineux"
  ],
  [
    "Both devices can send and receive at once. Explore one direction at a time; this example uses a separate fiber path for each. Port 12 and elevation 30 are teaching examples. Blue represents invisible IR; fiber jackets do not glow.",
    "Les deux équipements peuvent émettre et recevoir en même temps. Explorez un sens à la fois ; cet exemple utilise une fibre distincte pour chacun. Le port 12 et la hauteur 30 sont des exemples pédagogiques. Le bleu représente l’IR invisible ; les gaines ne brillent pas."
  ],
  [
    "Device {2} sends electrical data to its optic. Light carries that data through the fiber and cassettes to the other optic, which converts it back to electrical data for Device {3}.",
    "L’équipement {2} envoie des données électriques à son optique. La lumière les transporte à travers la fibre et les cassettes jusqu’à l’autre optique, qui les reconvertit en données électriques pour l’équipement {3}."
  ],
  [
    "Replay journey",
    "Rejouer le parcours"
  ],
  [
    "Device {0} has received the data through its optic. Switch direction to see the other device send.",
    "L’équipement {0} a reçu les données par son optique. Changez de sens pour voir l’autre équipement émettre."
  ],
  [
    "Resume journey",
    "Reprendre le parcours"
  ],
  [
    "Journey paused. Explore a connection or resume.",
    "Parcours en pause. Explorez une connexion ou reprenez."
  ],
  [
    "Following Device {0}’s data: electrical signals → light → electrical signals for Device {1}.",
    "Suivi des données de l’équipement {0} : signaux électriques → lumière → signaux électriques pour l’équipement {1}."
  ],
  [
    "Device {0} is ready to send. Press Play journey to follow its data.",
    "L’équipement {0} est prêt à émettre. Lancez le parcours pour suivre ses données."
  ],
  [
    "Fit both racks",
    "Afficher les deux baies"
  ],
  [
    "Light motion paused. You can still select each connection.",
    "Animation lumineuse en pause. Vous pouvez toujours sélectionner chaque connexion."
  ],
  [
    "Play the journey, or select a connection to see its close-up.",
    "Lancez le parcours ou sélectionnez une connexion pour la voir de près."
  ],
  [
    "{0} · front view",
    "{0} · vue de face"
  ],
  [
    "32 ports",
    "32 ports"
  ],
  [
    "Example: LC follower → MMC head → CAS 1 Port 12. Light continues through the passive; this is a patch, not a loopback. Use your actual FIM destination.",
    "Exemple : branche LC → tête MMC → CAS 1 port 12. La lumière traverse le passif ; il s’agit d’un raccordement, pas d’une boucle de retour. Utilisez votre destination FIM réelle."
  ],
  [
    "Example · CAS 1 Port 12",
    "Exemple · CAS 1 port 12"
  ],
  [
    "CAS passes TX onward → remote RX",
    "CAS transmet TX → RX distant"
  ],
  [
    "Optic 5",
    "Optique 5"
  ],
  [
    "TX starts here →",
    "TX part d’ici →"
  ],
  [
    "RX ← from remote",
    "RX ← depuis le distant"
  ],
  [
    "LC follower",
    "Branche LC"
  ],
  [
    "Match the head serial and FIM destination. CAS 1 Port 12 is only the destination used in this illustration.",
    "Vérifiez le numéro de tête et la destination FIM. CAS 1 port 12 est uniquement la destination de cette illustration."
  ],
  [
    "Inspect, clean if needed, then inspect again. Align the head with the adapter rails; do not force it.",
    "Inspectez, nettoyez si nécessaire, puis inspectez à nouveau. Alignez la tête sur les rails de l’adaptateur ; ne forcez pas."
  ],
  [
    "Head seated in Port 12. Confirm the latch, support the cable and check optic health. Select Seat again to replay.",
    "Tête enclenchée dans le port 12. Vérifiez le verrouillage, soutenez le câble et contrôlez l’état optique. Sélectionnez à nouveau Enclencher pour revoir l’animation."
  ],
  [
    "Example destination · CAS 1 Port 12",
    "Destination d’exemple · CAS 1 port 12"
  ],
  [
    "Port 12 · enlarged side view",
    "Port 12 · vue latérale agrandie"
  ],
  [
    "Port 12",
    "Port 12"
  ],
  [
    "Seated + latched",
    "Enclenché + verrouillé"
  ],
  [
    "Align the rails",
    "Alignez les rails"
  ],
  [
    "Match the head",
    "Identifiez la tête"
  ],
  [
    "Head serial · S747885346FWL",
    "Numéro de tête · S747885346FWL"
  ],
  [
    "LC loopback inserted into one duplex pair on the local optic. Purple tab above the ports. TX light travels through the loop and returns to RX.",
    "Boucle LC insérée dans une paire duplex de l’optique locale. Languette violette au-dessus des ports. La lumière TX traverse la boucle et revient à RX."
  ],
  [
    "LC loopback inserted · tests the local optic.",
    "Boucle LC insérée · teste l’optique locale."
  ],
  [
    "Local optic · front view",
    "Optique locale · vue de face"
  ],
  [
    "Position 2",
    "Position 2"
  ],
  [
    "Position 1",
    "Position 1"
  ],
  [
    "TX starts here",
    "TX part d’ici"
  ],
  [
    "RX receives",
    "RX reçoit"
  ],
  [
    "LC loopback",
    "Boucle LC"
  ],
  [
    "Two LC plugs · one return loop",
    "Deux fiches LC · une boucle de retour"
  ],
  [
    "CAS 1 cassette with ports 1 through 16 on the top row and 17 through 32 on the bottom row. An MMC loopback is inserted at port 12. The enlarged side view shows the optic and fiber feeding the opposite side of that adapter; light turns around inside the loopback.",
    "Cassette CAS 1 avec les ports 1 à 16 en haut et 17 à 32 en bas. Une boucle MMC est insérée au port 12. La vue latérale agrandie montre l’optique et la fibre raccordées au côté opposé de l’adaptateur ; la lumière fait demi-tour dans la boucle."
  ],
  [
    "MMC loopback inserted · tests the optic and fiber to this port. One pair shown.",
    "Boucle MMC insérée · teste l’optique et la fibre jusqu’à ce port. Une paire représentée."
  ],
  [
    "Port 12 · MMC loopback inserted",
    "Port 12 · boucle MMC insérée"
  ],
  [
    "RX ← loop return",
    "RX ← retour de boucle"
  ],
  [
    "LC + fiber",
    "LC + fibre"
  ],
  [
    "Adapter",
    "Adaptateur"
  ],
  [
    "Loopback",
    "Boucle de retour"
  ],
  [
    "Ethernet 25/1 · upright",
    "Ethernet 25/1 · à l’endroit"
  ],
  [
    "Ethernet 25/5 · upright",
    "Ethernet 25/5 · à l’endroit"
  ],
  [
    "Ethernet 7/1 · upside down",
    "Ethernet 7/1 · à l’envers"
  ],
  [
    "CAS 1 · Port 12",
    "CAS 1 · port 12"
  ],
  [
    "CAS 2 · Port 28",
    "CAS 2 · port 28"
  ],
  [
    "{0}/{1} means optic {2}, position {3}. With the tab {4}, that is the {5} side.",
    "{0}/{1} signifie optique {2}, position {3}. Avec la languette {4}, c’est le côté {5}."
  ],
  [
    "Top row: 1–16.",
    "Rangée du haut : 1–16."
  ],
  [
    "Bottom row: 17–32.",
    "Rangée du bas : 17–32."
  ],
  [
    "This head goes to CAS {0}, Port {1}. {2} The head serial identifies the fanout; the FIM ticket gives its destination.",
    "Cette tête va à CAS {0}, port {1}. {2} Son numéro identifie le fanout ; la fiche FIM indique sa destination."
  ],
  [
    "{0} selected. Drag it, or tap the port to place it.",
    "{0} sélectionné. Faites-le glisser ou touchez le port pour le placer."
  ],
  [
    "Released outside a port. Try again; this does not count as an answer.",
    "Relâché hors d’un port. Réessayez ; cela ne compte pas comme réponse."
  ],
  [
    "Tab below · upside down",
    "Languette en bas · à l’envers"
  ],
  [
    "Tab above · upright",
    "Languette en haut · à l’endroit"
  ],
  [
    "Left",
    "Gauche"
  ],
  [
    "Right",
    "Droite"
  ],
  [
    "{2} LC position of optic {3}",
    "Position LC {2} de l’optique {3}"
  ],
  [
    "CAS {2} Port {3}",
    "CAS {2} port {3}"
  ],
  [
    "CAS {0} · front view",
    "CAS {0} · vue de face"
  ],
  [
    "Top: 1–16 · Bottom: 17–32",
    "Haut : 1–16 · Bas : 17–32"
  ],
  [
    "↔ Scroll the cassette to reach every port.",
    "↔ Faites défiler la cassette pour atteindre tous les ports."
  ],
  [
    "CAS {1} cassette. Scroll horizontally to see all 32 ports.",
    "Cassette CAS {1}. Faites défiler horizontalement pour voir les 32 ports."
  ],
  [
    "Choose an LC connector or MMC head first.",
    "Choisissez d’abord un connecteur LC ou une tête MMC."
  ],
  [
    "✓ Seated in the correct port.",
    "✓ Enclenché dans le bon port."
  ],
  [
    "LC followers connect to the optic.",
    "Les branches LC se raccordent à l’optique."
  ],
  [
    "The MMC head connects to the CAS.",
    "La tête MMC se raccorde au CAS."
  ],
  [
    "{0} is the wrong connector here. {1}",
    "{0} n’est pas le bon connecteur ici. {1}"
  ],
  [
    "That is a different port.",
    "C’est un autre port."
  ],
  [
    "Try again.",
    "Réessayez."
  ],
  [
    "Beginner patching · exam available anytime",
    "Raccordement débutant · examen disponible à tout moment"
  ],
  [
    "Beginner patching · best exam {0}/5",
    "Raccordement débutant · meilleur résultat {0}/5"
  ],
  [
    "· progress lasts for this visit",
    "· progression conservée pour cette visite"
  ],
  [
    "Your patching exam is saved.",
    "Votre examen de raccordement est enregistré."
  ],
  [
    "Resume patching exam",
    "Reprendre l’examen de raccordement"
  ],
  [
    "Patching basics passed",
    "Bases du raccordement acquises"
  ],
  [
    "Keep building your patching skills",
    "Continuez à développer vos compétences de raccordement"
  ],
  [
    "You matched at least four of the five tickets.",
    "Vous avez réussi au moins quatre fiches sur cinq."
  ],
  [
    "Aim for 4/5. Review the missed placements below.",
    "Visez 4/5. Revoyez les placements manqués ci-dessous."
  ],
  [
    "LC positions, optic orientation, and both CAS rows covered.",
    "Positions LC, orientation de l’optique et deux rangées du CAS abordées."
  ],
  [
    "Correct on the first placement. {2}",
    "Correct au premier placement. {2}"
  ],
  [
    "Retake 5 questions",
    "Repasser les 5 questions"
  ],
  [
    "Back to practice",
    "Retour à l’entraînement"
  ],
  [
    "Choose a practice ticket",
    "Choisissez une fiche d’entraînement"
  ],
  [
    "Practice ticket",
    "Fiche d’entraînement"
  ],
  [
    "Question {0} of 5 · first placement counts",
    "Question {0} sur 5 · le premier placement compte"
  ],
  [
    "Patching questions completed",
    "Questions de raccordement terminées"
  ],
  [
    "Patch Ethernet {0}/{1}",
    "Raccordez Ethernet {0}/{1}"
  ],
  [
    "Patch CAS {0} · Port {1}",
    "Raccordez CAS {0} · port {1}"
  ],
  [
    "Follower: Leg {0} · of the 12-leg fanout",
    "Branche : {0} · du fanout à 12 branches"
  ],
  [
    "Connector: MMC leader / head",
    "Connecteur : tête MMC"
  ],
  [
    "Select {1}",
    "Sélectionner {1}"
  ],
  [
    "Match the Ethernet suffix to the optic position. Check which way the purple tab faces.",
    "Associez le suffixe Ethernet à la position sur l’optique. Vérifiez l’orientation de la languette violette."
  ],
  [
    "Match the CAS and port in the ticket. The serial alone does not tell you the port.",
    "Vérifiez le CAS et le port sur la fiche. Le numéro de série seul n’indique pas le port."
  ],
  [
    "Choose your connector, then make one placement.",
    "Choisissez votre connecteur, puis effectuez un placement."
  ],
  [
    "See my exam result",
    "Voir mon résultat"
  ],
  [
    "Next question",
    "Question suivante"
  ],
  [
    "Next practice ticket",
    "Fiche d’entraînement suivante"
  ],
  [
    "Mock FIM ticket · training example",
    "Fiche FIM simulée · exemple pédagogique"
  ],
  [
    "Head {3}",
    "Tête {3}"
  ],
  [
    "Pull the cable to a port. Or select its connector, then tap the port.",
    "Tirez le câble vers un port. Ou sélectionnez son connecteur, puis touchez le port."
  ],
  [
    "Choose a connector",
    "Choisissez un connecteur"
  ],
  [
    "← Beginner exams",
    "← Examens débutants"
  ],
  [
    "Patching activity",
    "Activité de raccordement"
  ],
  [
    "Practice · retry freely",
    "Entraînement · essais illimités"
  ],
  [
    "Take the 5-question exam",
    "Passer l’examen de 5 questions"
  ],
  [
    "Correct placement.",
    "Placement correct."
  ],
  [
    "This placement did not match.",
    "Ce placement ne correspond pas."
  ],
  [
    "Drag cancelled. Choose a connector to try again.",
    "Déplacement annulé. Choisissez un connecteur pour réessayer."
  ],
  [
    "Optic {0} · front view",
    "Optique {0} · vue de face"
  ],
  [
    "Position {0}",
    "Position {0}"
  ],
  [
    "Tab below: upside down.",
    "Languette en bas : à l’envers."
  ],
  [
    "Tab above: upright.",
    "Languette en haut : à l’endroit."
  ],
  [
    "Optic {0}. {1} Choose one LC position.",
    "Optique {0}. {1} Choisissez une position LC."
  ],
  [
    "{0}. Ethernet {1}/{2} → position {3}, now on the {4}. The outside connector edge faces {5}.",
    "{0}. Ethernet {1}/{2} → position {3}, maintenant à {4}. Le bord extérieur du connecteur est du côté {5}."
  ],
  [
    "Local optic disconnected",
    "Optique locale déconnectée"
  ],
  [
    "Device A · local optic",
    "Équipement A · optique locale"
  ],
  [
    "Onward fiber unplugged",
    "Fibre suivante débranchée"
  ],
  [
    "Device B · remote optic",
    "Équipement B · optique distante"
  ],
  [
    "LC legs",
    "Branches LC"
  ],
  [
    "Remote optic",
    "Optique distante"
  ],
  [
    "Unplugged",
    "Débranché"
  ],
  [
    "CAS {0} · Port 12",
    "CAS {0} · port 12"
  ],
  [
    "VFL on LC {0} passes through CAS 1 and exits CAS 2 at {1}. Both optics are disconnected.",
    "Le VFL sur LC {0} traverse CAS 1 et sort de CAS 2 en {1}. Les deux optiques sont déconnectées."
  ],
  [
    "The pair is swapped between CAS 1 and CAS 2. Local TX reaches remote TX; both receivers are dark.",
    "La paire est inversée entre CAS 1 et CAS 2. TX local atteint TX distant ; les deux récepteurs sont dans le noir."
  ],
  [
    "Each device’s TX passes through CAS 1 and CAS 2 to the other device’s RX.",
    "TX de chaque équipement traverse CAS 1 et CAS 2 jusqu’à RX de l’autre équipement."
  ],
  [
    "Polarity: send light to the receiver",
    "Polarité : envoyer la lumière au récepteur"
  ],
  [
    "TX sends. RX receives. Polarity is how the strands connect those jobs through the whole path.",
    "TX émet. RX reçoit. La polarité décrit comment les fibres relient ces fonctions sur tout le chemin."
  ],
  [
    "One duplex pair, enlarged. A / B are teaching labels, not MMC pin numbers or the optic’s /1 and /5 port positions. This example expects A → A and B → B at the passives; use your actual cable and FIM channel map.",
    "Une paire duplex agrandie. A / B sont des repères pédagogiques, pas des numéros de broche MMC ni les positions /1 et /5 de l’optique. Cet exemple attend A → A et B → B aux passifs ; utilisez votre câble et le plan des canaux FIM réels."
  ],
  [
    "Light on the other channel?",
    "De la lumière sur l’autre canal ?"
  ],
  [
    "Trace both strands and compare the map. Both may carry light even when their destinations are wrong.",
    "Tracez les deux fibres et comparez le plan. Les deux peuvent transmettre de la lumière même si leurs destinations sont incorrectes."
  ],
  [
    "No light on one strand?",
    "Aucune lumière sur une fibre ?"
  ],
  [
    "Check the VFL / adapter, LC, fiber and MMC connections. Compare the loose head with the CAS output. This alone cannot identify a bad ferrule.",
    "Vérifiez le VFL / adaptateur, le LC, la fibre et les connexions MMC. Comparez la tête débranchée à la sortie CAS. Cela seul ne permet pas d’identifier une férule défectueuse."
  ],
  [
    "A loop passed?",
    "Une boucle a réussi ?"
  ],
  [
    "It can join TX back to RX even with a swapped pair. Verify the mapped service path after removing the loop.",
    "Elle peut relier TX à RX même avec une paire inversée. Vérifiez le chemin de service prévu après avoir retiré la boucle."
  ],
  [
    "A polarity mismatch alone does not turn off local TX. VFL checks routing and continuity; it does not prove acceptable optical loss or optic health.",
    "Une erreur de polarité seule n’éteint pas TX local. Le VFL vérifie le chemin et la continuité ; il ne prouve ni une perte optique acceptable ni le bon fonctionnement de l’optique."
  ],
  [
    "For a real VFL test, isolate the section from active optics and use the matching adapter. View light indirectly. Sources:",
    "Pour un test VFL réel, isolez la section des optiques actives et utilisez l’adaptateur adapté. Observez la lumière indirectement. Sources :"
  ],
  [
    "US Conec · polarity mapping",
    "US Conec · affectation de polarité"
  ],
  [
    "Fluke · VFL testing",
    "Fluke · tests VFL"
  ],
  [
    "Use this in Troubleshoot →",
    "Utiliser dans Dépanner →"
  ],
  [
    "Polarity light source",
    "Source lumineuse de polarité"
  ],
  [
    "Optic light",
    "Lumière de l’optique"
  ],
  [
    "VFL trace",
    "Traçage VFL"
  ],
  [
    "Swap the pair",
    "Inverser la paire"
  ],
  [
    "VFL strand to trace",
    "Fibre à tracer au VFL"
  ],
  [
    "VFL on LC A",
    "VFL sur LC A"
  ],
  [
    "VFL on LC B",
    "VFL sur LC B"
  ],
  [
    "Correct the pair",
    "Corriger la paire"
  ],
  [
    "LC {0} → CAS 2 channel {1}",
    "LC {0} → canal {1} de CAS 2"
  ],
  [
    "TX meets TX. Both RX paths are dark.",
    "TX rejoint TX. Les deux chemins RX sont dans le noir."
  ],
  [
    "TX reaches RX in both directions.",
    "TX atteint RX dans les deux sens."
  ],
  [
    "Light is present, but on the other channel. Switch LC A / B to check the second strand.",
    "La lumière est présente, mais sur l’autre canal. Passez de LC A à LC B pour vérifier la seconde fibre."
  ],
  [
    "Red exits at the expected channel. Switch LC A / B, or swap the pair to compare.",
    "Le rouge sort sur le canal attendu. Changez de LC A à LC B, ou inversez la paire pour comparer."
  ],
  [
    "Both transmitters still emit. The passive connections route their light to the wrong destination.",
    "Les deux émetteurs continuent d’émettre. Les connexions passives acheminent leur lumière vers la mauvaise destination."
  ],
  [
    "The CAS connections carry the light; they do not create it. Swap the pair to see what changes.",
    "Les connexions CAS transmettent la lumière ; elles ne la créent pas. Inversez la paire pour voir la différence."
  ],
  [
    "Red = visible VFL · onward fiber unplugged at CAS 2",
    "Rouge = VFL visible · fibre suivante débranchée à CAS 2"
  ],
  [
    "Blue / teal = invisible optic IR · yellow = fiber",
    "Bleu / turquoise = IR invisible de l’optique · jaune = fibre"
  ],
  [
    "Spot the problem",
    "Repérer le problème"
  ],
  [
    "Check the connection",
    "Vérifier la connexion"
  ],
  [
    "Understand the light",
    "Comprendre la lumière"
  ],
  [
    "Narrow down the problem",
    "Localiser le problème"
  ],
  [
    "Read the signs and consider what could cause them.",
    "Lisez les signes et envisagez leurs causes possibles."
  ],
  [
    "Inspect connections, match FIM and check your changes.",
    "Inspectez les connexions, vérifiez FIM et contrôlez vos changements."
  ],
  [
    "Follow TX and RX, compare limits and check every lane.",
    "Suivez TX et RX, comparez les limites et vérifiez chaque voie."
  ],
  [
    "Use local loops and VFL observations to choose the next check.",
    "Utilisez les boucles locales et les observations VFL pour choisir le prochain contrôle."
  ],
  [
    "Read the signal",
    "Lire le signal"
  ],
  [
    "The report shows −40 in red. What do we know so far?",
    "Le rapport affiche −40 en rouge. Que savons-nous à ce stade ?"
  ],
  [
    "No light is being reported; the cause is still unknown.",
    "Aucune lumière n’est signalée ; la cause reste inconnue."
  ],
  [
    "The optic has failed and needs replacing.",
    "L’optique est défectueuse et doit être remplacée."
  ],
  [
    "The fiber is broken somewhere beyond the first passive.",
    "La fibre est cassée quelque part après le premier passif."
  ],
  [
    "In this Cable Guy example, −40 means no light is reported. It does not identify the failed part. Start checking the possible causes.",
    "Dans cet exemple Cable Guy, −40 signifie qu’aucune lumière n’est signalée. Cela n’identifie pas la pièce défectueuse. Commencez à vérifier les causes possibles."
  ],
  [
    "No light reported ≠ a diagnosis",
    "Aucune lumière signalée ≠ diagnostic"
  ],
  [
    "Consider possible causes",
    "Envisager les causes possibles"
  ],
  [
    "No light is arriving. Which problems could explain it?",
    "Aucune lumière n’arrive. Quels problèmes pourraient l’expliquer ?"
  ],
  [
    "A dirty or partly seated connection.",
    "Une connexion sale ou partiellement enclenchée."
  ],
  [
    "A badly bent or damaged fiber.",
    "Une fibre trop courbée ou endommagée."
  ],
  [
    "Normal infrared light being invisible to our eyes.",
    "Le fait que la lumière infrarouge normale soit invisible à l’œil."
  ],
  [
    "A misport or incorrect fiber pairing.",
    "Un mauvais port ou une association incorrecte des fibres."
  ],
  [
    "The far-end optic or sending port is not producing light.",
    "L’optique distante ou le port émetteur ne produit pas de lumière."
  ],
  [
    "Connections, fiber, mapping and the sending source are all candidates. Invisible infrared is normal—the receiver detects it even though our eyes cannot.",
    "Les connexions, la fibre, l’affectation et la source émettrice sont toutes à vérifier. L’infrarouge invisible est normal : le récepteur le détecte, contrairement à nos yeux."
  ],
  [
    "Several causes fit the same symptom",
    "Plusieurs causes peuvent donner le même symptôme"
  ],
  [
    "Interpret a change",
    "Interpréter un changement"
  ],
  [
    "You clean and reseat one connection. Light returns. What can you conclude?",
    "Vous nettoyez et réenclenchez une connexion. La lumière revient. Que pouvez-vous conclure ?"
  ],
  [
    "Cleaning alone definitely fixed it.",
    "Le nettoyage seul a certainement résolu le problème."
  ],
  [
    "Dirt or seating likely contributed; recheck health.",
    "La saleté ou l’enclenchement a probablement contribué ; revérifiez l’état optique."
  ],
  [
    "The whole fiber path and both optics are proven good.",
    "Tout le chemin de fibre et les deux optiques sont prouvés fonctionnels."
  ],
  [
    "You changed both cleanliness and seating, so either could have helped. Light returning is useful evidence; check the limits and link status before closing the issue.",
    "Vous avez modifié la propreté et l’enclenchement ; l’un ou l’autre a pu aider. Le retour de la lumière est un indice utile ; vérifiez les limites et l’état de la liaison avant de clore l’incident."
  ],
  [
    "The connection improved; the full link still needs checking",
    "La connexion s’est améliorée ; la liaison complète reste à vérifier"
  ],
  [
    "Notice connection problems",
    "Repérer les problèmes de connexion"
  ],
  [
    "Which connection needs a closer seating check?",
    "Quelle connexion nécessite de vérifier davantage l’enclenchement ?"
  ],
  [
    "Connection A",
    "Connexion A"
  ],
  [
    "Connection B",
    "Connexion B"
  ],
  [
    "B has a visible gap at the adapter. After the required isolation and inspection, align and seat it fully, then recheck. Appearance alone does not prove optical health.",
    "B présente un espace visible à l’adaptateur. Après l’isolation et l’inspection requises, alignez et enclenchez complètement, puis revérifiez. L’apparence seule ne prouve pas le bon fonctionnement optique."
  ],
  [
    "B: check the gap, seating and latch",
    "B : vérifier l’espace, l’enclenchement et le verrouillage"
  ],
  [
    "You remove a tight bend from the fiber. RX improves, as shown below. Is the problem fixed?",
    "Vous supprimez une courbure trop serrée. RX s’améliore, comme ci-dessous. Le problème est-il résolu ?"
  ],
  [
    "Yes. The reading improved, so the link is healthy.",
    "Oui. La mesure s’est améliorée, donc la liaison fonctionne correctement."
  ],
  [
    "Not yet. RX is still below the allowed range; keep checking the fiber path and connections.",
    "Pas encore. RX reste sous la plage autorisée ; continuez à vérifier le chemin de fibre et les connexions."
  ],
  [
    "No. This proves the optic is faulty and must be replaced.",
    "Non. Cela prouve que l’optique est défectueuse et doit être remplacée."
  ],
  [
    "Removing the bend helped: more light now reaches RX. But −4.00 is still below this example’s minimum of −3.00 dBm. Keep checking for remaining problems, then confirm all required readings are within the installed optic’s limits and the link works. This result alone does not prove the optic is faulty.",
    "Supprimer la courbure a aidé : davantage de lumière atteint RX. Mais −4.00 reste inférieur au minimum de −3.00 dBm de cet exemple. Continuez à chercher les autres problèmes, puis confirmez que toutes les mesures requises respectent les limites de l’optique installée et que la liaison fonctionne. Ce résultat seul ne prouve pas une optique défectueuse."
  ],
  [
    "The bend was part of the problem. The reading is still too low.",
    "La courbure contribuait au problème. La mesure reste trop faible."
  ],
  [
    "Check connections",
    "Vérifier les connexions"
  ],
  [
    "Inspection finds contamination. What should happen before reconnecting?",
    "L’inspection révèle une contamination. Que faut-il faire avant de reconnecter ?"
  ],
  [
    "Reconnect if the connector looks clean without magnification.",
    "Reconnecter si le connecteur semble propre à l’œil nu."
  ],
  [
    "Clean with approved tools, then inspect again.",
    "Nettoyer avec les outils approuvés, puis inspecter à nouveau."
  ],
  [
    "Clean once and reconnect without another inspection.",
    "Nettoyer une fois et reconnecter sans nouvelle inspection."
  ],
  [
    "With the connection safely isolated, clean it and inspect again. A cleaning attempt alone does not confirm the end face is clean.",
    "Une fois la connexion isolée en sécurité, nettoyez-la et inspectez à nouveau. Une tentative de nettoyage seule ne confirme pas la propreté de la face optique."
  ],
  [
    "Inspect → clean if needed → inspect again",
    "Inspecter → nettoyer si nécessaire → inspecter à nouveau"
  ],
  [
    "Clean and fully seated, but still −40. What is the useful next step?",
    "Propre et bien enclenché, mais toujours −40. Quelle est la prochaine étape utile ?"
  ],
  [
    "Replace the optic immediately; the fiber is ruled out.",
    "Remplacer immédiatement l’optique ; la fibre est hors de cause."
  ],
  [
    "Keep reseating the same connector until the reading changes.",
    "Réenclencher sans cesse le même connecteur jusqu’à ce que la mesure change."
  ],
  [
    "Verify the FIM mapping, then use the approved local optic test.",
    "Vérifier l’affectation FIM, puis utiliser le test local approuvé de l’optique."
  ],
  [
    "A clean, seated connector rules out neither a mispatch nor a source problem. Confirm the mapping and isolate the local optic using the correct approved loop setup.",
    "Un connecteur propre et enclenché n’exclut ni un mauvais raccordement ni un problème de source. Confirmez l’affectation et isolez l’optique locale avec la boucle approuvée appropriée."
  ],
  [
    "One checked connection does not prove the whole path",
    "Une connexion vérifiée ne prouve pas tout le chemin"
  ],
  [
    "Handle fiber carefully",
    "Manipuler la fibre avec soin"
  ],
  [
    "A fiber cable is squeezed under a cable-management clip. Its outer covering is not torn. What should you do first?",
    "Un câble fibre est comprimé sous une attache du gestionnaire de câbles. Sa gaine n’est pas déchirée. Que faire en premier ?"
  ],
  [
    "Carefully relieve the pressure, check the cable for damage, and recheck the light reading.",
    "Relâcher soigneusement la pression, vérifier les dommages et contrôler à nouveau la lumière."
  ],
  [
    "Leave it—the outside looks fine, so the fiber inside must be fine.",
    "Ne rien faire : l’extérieur paraît intact, donc la fibre intérieure est forcément intacte."
  ],
  [
    "Replace the optic—the squeezed cable cannot affect the light.",
    "Remplacer l’optique : le câble comprimé ne peut pas affecter la lumière."
  ],
  [
    "The jacket is the cable’s outer covering. It can look fine while pressure or a sharp bend affects the fiber inside. Follow site handling procedures: release the pressure, route the cable with a wide enough curve for its bend limit, inspect for damage, and retest.",
    "La gaine est l’enveloppe extérieure du câble. Elle peut sembler intacte alors que la pression ou une courbure serrée affecte la fibre à l’intérieur. Suivez les procédures du site : relâchez la pression, respectez le rayon minimal de courbure, inspectez les dommages et retestez."
  ],
  [
    "Check the route and the result",
    "Vérifier le parcours et le résultat"
  ],
  [
    "Match the FIM destination",
    "Trouver la destination FIM"
  ],
  [
    "FIM calls for CAS 2, Port 28. Select that port.",
    "FIM indique CAS 2, port 28. Sélectionnez ce port."
  ],
  [
    "CAS 2 Port {0}",
    "CAS 2 port {0}"
  ],
  [
    "Port 28 is on the bottom row, which runs 17–32. Match the exact CAS, port and fiber labels; the nearest empty port may lead elsewhere.",
    "Le port 28 est dans la rangée du bas, de 17 à 32. Vérifiez le CAS, le port et les étiquettes exacts ; le port libre le plus proche peut mener ailleurs."
  ],
  [
    "CAS 2 / 28: the mapped destination",
    "CAS 2 / 28 : la destination prévue"
  ],
  [
    "Verify a change",
    "Vérifier un changement"
  ],
  [
    "You reseat the mapped connector. What should you do before changing another part?",
    "Vous réenclenchez le connecteur prévu. Que faire avant de modifier une autre pièce ?"
  ],
  [
    "Replace the next jumper so two possible causes are covered.",
    "Remplacer le cordon suivant pour couvrir deux causes possibles."
  ],
  [
    "Mark it fixed because the latch is now engaged.",
    "Déclarer le problème résolu puisque le verrou est engagé."
  ],
  [
    "Recheck the report and record what changed.",
    "Revérifier le rapport et noter ce qui a changé."
  ],
  [
    "Check the result after each change. That connects an action to its effect and helps you decide whether another check is needed.",
    "Vérifiez le résultat après chaque changement. Cela relie l’action à son effet et aide à décider si un autre contrôle est nécessaire."
  ],
  [
    "One change → observe → decide",
    "Un changement → observer → décider"
  ],
  [
    "Understand the optic",
    "Comprendre l’optique"
  ],
  [
    "What job does the optic do between the device and fiber?",
    "Quel est le rôle de l’optique entre l’équipement et la fibre ?"
  ],
  [
    "Converts device data to light, and received light back to data.",
    "Convertir les données de l’équipement en lumière, et la lumière reçue en données."
  ],
  [
    "Only strengthens light coming from the passive cassette.",
    "Seulement renforcer la lumière venant de la cassette passive."
  ],
  [
    "Sends the visible red tracing light used by a VFL.",
    "Émettre la lumière rouge visible de traçage utilisée par un VFL."
  ],
  [
    "The optic translates between electrical data and optical signals. A passive connects paths; a VFL is a separate red-light test tool.",
    "L’optique convertit les données électriques en signaux optiques et inversement. Un passif relie des chemins ; un VFL est un outil de test distinct à lumière rouge."
  ],
  [
    "Device data ↔ optic ↔ light in fiber",
    "Données de l’équipement ↔ optique ↔ lumière dans la fibre"
  ],
  [
    "Follow TX and RX",
    "Suivre TX et RX"
  ],
  [
    "You are at the local device. Which path is its RX?",
    "Vous êtes à l’équipement local. Quel chemin correspond à son RX ?"
  ],
  [
    "A · light leaving the local device",
    "A · lumière quittant l’équipement local"
  ],
  [
    "B · light arriving at the local device",
    "B · lumière arrivant à l’équipement local"
  ],
  [
    "RX receives light from the other end. TX sends light outward. The remote TX feeds the local RX; blue arrows illustrate invisible infrared light.",
    "RX reçoit la lumière de l’autre extrémité. TX émet vers l’extérieur. TX distant alimente RX local ; les flèches bleues illustrent l’infrarouge invisible."
  ],
  [
    "B: remote TX → local RX",
    "B : TX distant → RX local"
  ],
  [
    "Compare readings with limits",
    "Comparer les mesures aux limites"
  ],
  [
    "Use the limits shown. Which statement fits these readings?",
    "Utilisez les limites indiquées. Quelle affirmation correspond à ces mesures ?"
  ],
  [
    "RX must reach exactly zero before it is acceptable.",
    "RX doit atteindre exactement zéro pour être acceptable."
  ],
  [
    "TX and RX must match each other.",
    "TX et RX doivent être identiques."
  ],
  [
    "Both are within these limits; they do not need to match.",
    "Les deux respectent ces limites ; ils n’ont pas besoin d’être identiques."
  ],
  [
    "Each reading is compared with its own lower and upper limits. These powers are within the example range; also check required lanes and link status.",
    "Chaque mesure se compare à ses propres limites basse et haute. Ces puissances respectent la plage d’exemple ; vérifiez aussi les voies requises et l’état de la liaison."
  ],
  [
    "Within range—not an exact-zero target",
    "Dans la plage, sans viser exactement zéro"
  ],
  [
    "RX is −4.20. The example allows −3.00 to +3.00. What does that mean?",
    "RX vaut −4.20. L’exemple autorise −3.00 à +3.00. Que signifie ce résultat ?"
  ],
  [
    "Some light is present, but RX is below this allowed range.",
    "De la lumière est présente, mais RX est sous la plage autorisée."
  ],
  [
    "It is acceptable because it is not −40.",
    "C’est acceptable parce que ce n’est pas −40."
  ],
  [
    "It is too strong because 4.20 is greater than 3.00.",
    "C’est trop fort parce que 4.20 est supérieur à 3.00."
  ],
  [
    "−4.20 is more negative, so it is weaker than −3.00. Investigate why the received power is low; the reading alone does not locate the cause.",
    "−4.20 est plus négatif, donc plus faible que −3.00. Cherchez pourquoi la puissance reçue est faible ; la mesure seule ne localise pas la cause."
  ],
  [
    "Below the lower limit; cause still unknown",
    "Sous la limite basse ; cause encore inconnue"
  ],
  [
    "Check every lane",
    "Vérifier chaque voie"
  ],
  [
    "Which receive lane still needs a no-light check?",
    "Quelle voie de réception nécessite encore une recherche d’absence de lumière ?"
  ],
  [
    "RX lane 1: +0.25 dBm",
    "Voie RX 1 : +0.25 dBm"
  ],
  [
    "RX lane 2: +0.28 dBm",
    "Voie RX 2 : +0.28 dBm"
  ],
  [
    "RX lane 3: −40 dBm",
    "Voie RX 3 : −40 dBm"
  ],
  [
    "RX lane 4: +0.21 dBm",
    "Voie RX 4 : +0.21 dBm"
  ],
  [
    "Lane 3 still reports no light. The other lanes cannot prove that this lane works. Follow its mapped path and check the link status too.",
    "La voie 3 signale toujours une absence de lumière. Les autres voies ne prouvent pas qu’elle fonctionne. Suivez son chemin prévu et vérifiez aussi l’état de la liaison."
  ],
  [
    "Lane 3: −40 needs investigation",
    "Voie 3 : −40 nécessite une vérification"
  ],
  [
    "Interpret local loop results",
    "Interpréter les résultats de boucle locale"
  ],
  [
    "The approved direct optic loop passes. The restored link still fails. What next?",
    "La boucle directe approuvée sur l’optique réussit. La liaison normalisée échoue toujours. Et ensuite ?"
  ],
  [
    "Mark the remote optic healthy because the local loop passed.",
    "Déclarer l’optique distante fonctionnelle puisque la boucle locale a réussi."
  ],
  [
    "Extend the test to the next accessible passive using the mapped loop.",
    "Étendre le test au prochain passif accessible avec la boucle prévue."
  ],
  [
    "Replace the local optic before checking any connected fiber.",
    "Remplacer l’optique locale avant de vérifier la fibre raccordée."
  ],
  [
    "The local optic passed this test. Extend outward through the fiber and connections you can reach. A direct loop does not test the long route or remote optic.",
    "L’optique locale a réussi ce test. Étendez-le aux fibres et connexions accessibles. Une boucle directe ne teste ni le long parcours ni l’optique distante."
  ],
  [
    "Checked locally; extend the tested path",
    "Vérifié localement ; étendre le chemin testé"
  ],
  [
    "Read the loop results. Which section should you investigate next?",
    "Lisez les résultats des boucles. Quelle section faut-il examiner ensuite ?"
  ],
  [
    "A · local optic to CAS 1",
    "A · optique locale à CAS 1"
  ],
  [
    "B · CAS 1 to CAS 2, including its connections",
    "B · CAS 1 à CAS 2, connexions comprises"
  ],
  [
    "C · beyond CAS 2 toward the remote device",
    "C · au-delà de CAS 2 vers l’équipement distant"
  ],
  [
    "The direct loop and CAS 1 loop passed. The CAS 2 loop failed, so first verify that loop setup, then investigate the added span and its connections. This does not locate a break. Beyond CAS 2 is untested.",
    "La boucle directe et celle de CAS 1 ont réussi. Celle de CAS 2 a échoué : vérifiez d’abord ce montage, puis examinez la section ajoutée et ses connexions. Cela ne localise pas une cassure. Au-delà de CAS 2, rien n’est testé."
  ],
  [
    "B is suspect. Verify the loop setup, then isolate this span.",
    "B est suspect. Vérifiez le montage de boucle, puis isolez cette section."
  ],
  [
    "Use VFL observations",
    "Utiliser les observations VFL"
  ],
  [
    "Before connecting a VFL (red-light tester), what must you confirm about the fiber section you will trace?",
    "Avant de connecter un VFL (testeur à lumière rouge), que faut-il confirmer sur la section de fibre à tracer ?"
  ],
  [
    "Only the near end is disconnected; the far end can stay connected to an optic.",
    "Seule l’extrémité proche est déconnectée ; l’autre peut rester reliée à une optique."
  ],
  [
    "The VFL adapter fits; the far-end connection can remain unchecked.",
    "L’adaptateur VFL convient ; la connexion distante peut rester sans vérification."
  ],
  [
    "Both ends are disconnected from active equipment, and the VFL adapter matches the connector.",
    "Les deux extrémités sont déconnectées des équipements actifs et l’adaptateur VFL correspond au connecteur."
  ],
  [
    "Check both ends of the section—not just the end in your hand. Disconnect them from active equipment under your site’s procedure, then use the matching VFL adapter. The VFL supplies its own red light; do not send it into an optic. Detect it using the approved method, never by looking into a fiber end.",
    "Vérifiez les deux extrémités de la section, pas seulement celle en main. Déconnectez-les des équipements actifs selon la procédure du site, puis utilisez l’adaptateur adapté. Le VFL produit sa propre lumière rouge ; ne l’envoyez pas dans une optique. Détectez-la avec la méthode approuvée, sans jamais regarder dans une extrémité de fibre."
  ],
  [
    "Both ends disconnected + matching adapter",
    "Deux extrémités déconnectées + adaptateur adapté"
  ],
  [
    "FIM expects Port 12. VFL light is detected at Port 13. What next?",
    "FIM prévoit le port 12. La lumière VFL est détectée au port 13. Et ensuite ?"
  ],
  [
    "Replace the optic because the light reached the wrong port.",
    "Remplacer l’optique parce que la lumière a atteint le mauvais port."
  ],
  [
    "Compare fiber labels, actual patching and the FIM record.",
    "Comparer les étiquettes, le raccordement réel et la fiche FIM."
  ],
  [
    "Update FIM to Port 13 immediately without checking the route.",
    "Modifier immédiatement FIM en port 13 sans vérifier le parcours."
  ],
  [
    "The observation and expected route disagree. Check the labels and actual path before deciding whether the patch or record needs correction.",
    "L’observation ne correspond pas au chemin attendu. Vérifiez les étiquettes et le chemin réel avant de décider s’il faut corriger le raccordement ou la fiche."
  ],
  [
    "Observed 13 ≠ expected 12: verify the mapping",
    "Observé 13 ≠ attendu 12 : vérifier l’affectation"
  ],
  [
    "VFL light reaches the expected port. What still needs checking?",
    "La lumière VFL atteint le port attendu. Que reste-t-il à vérifier ?"
  ],
  [
    "Optical loss and link health after restoring the mapped connection.",
    "La perte optique et l’état de la liaison après normalisation du raccordement prévu."
  ],
  [
    "Nothing—the visible light proves every network lane is healthy.",
    "Rien : la lumière visible prouve que toutes les voies réseau fonctionnent correctement."
  ],
  [
    "Only the remote device; this proves all local fiber loss is acceptable.",
    "Seulement l’équipement distant ; cela prouve que toutes les pertes locales sont acceptables."
  ],
  [
    "VFL supports continuity and mapping. It does not measure acceptable network-light loss. Use the appropriate loss test when needed, restore the path and recheck optic and link health.",
    "Le VFL aide à vérifier la continuité et l’affectation. Il ne mesure pas une perte acceptable pour la lumière réseau. Utilisez un test de perte adapté si nécessaire, normalisez le chemin et revérifiez l’optique et la liaison."
  ],
  [
    "Path found. Loss and link health remain unverified.",
    "Chemin trouvé. Perte et état de liaison non vérifiés."
  ],
  [
    "Fiber Apprentice {0}",
    "Apprenti fibre {0}"
  ],
  [
    "Fiber Learner",
    "Élève fibre"
  ],
  [
    "Identify the connected device",
    "Identifier l’équipement connecté"
  ],
  [
    "Device A receives an LLDP message from Device B. What does this help A check?",
    "L’équipement A reçoit un message LLDP de B. Que peut-il vérifier grâce à cela ?"
  ],
  [
    "Which device and port are connected at the other end.",
    "Quel équipement et quel port sont connectés à l’autre extrémité."
  ],
  [
    "Whether every fiber has acceptable optical loss.",
    "Si chaque fibre a une perte optique acceptable."
  ],
  [
    "Whether a second, backup cable has been installed.",
    "Si un deuxième câble de secours est installé."
  ],
  [
    "LLDP means Link Layer Discovery Protocol. Devices announce their identity and port over the existing connection. A lists B as its neighbor, even with passive cassettes between them. Check light health separately.",
    "LLDP signifie Link Layer Discovery Protocol. Les équipements annoncent leur identité et leur port sur la connexion existante. A indique B comme voisin, même avec des cassettes passives entre eux. Vérifiez l’état optique séparément."
  ],
  [
    "LLDP identifies the other end of the existing link.",
    "LLDP identifie l’autre extrémité de la liaison existante."
  ],
  [
    "Compare the reported neighbor with FIM",
    "Comparer le voisin signalé à FIM"
  ],
  [
    "The device name matches FIM, but the neighbor port does not. What should you do next?",
    "Le nom d’équipement correspond à FIM, mais pas le port du voisin. Que faire ensuite ?"
  ],
  [
    "Accept it because the device name matches.",
    "Accepter puisque le nom d’équipement correspond."
  ],
  [
    "Replace the optic because LLDP measures weak light.",
    "Remplacer l’optique parce que LLDP mesure une lumière faible."
  ],
  [
    "Compare the actual patching and labels with the expected device AND port.",
    "Comparer le raccordement réel et les étiquettes à l’équipement ET au port attendus."
  ],
  [
    "The expected endpoint includes both the device and its port. A fresh LLDP report can reveal a mapping mismatch. Verify the patching and record before deciding what needs correction; LLDP is not an optical-power measurement.",
    "L’extrémité attendue comprend l’équipement et son port. Un rapport LLDP récent peut révéler une erreur d’affectation. Vérifiez le raccordement et la fiche avant de décider quoi corriger ; LLDP ne mesure pas la puissance optique."
  ],
  [
    "Matching the device alone does not match the full assignment.",
    "Le bon équipement seul ne suffit pas à confirmer toute l’affectation."
  ],
  [
    "Confirm the assigned ports",
    "Confirmer les ports attribués"
  ],
  [
    "Combine identity and light evidence",
    "Combiner identité et mesures lumineuses"
  ],
  [
    "Light readings are within the supplied limits, but a fresh LLDP report names Device C instead of the assigned Device B. Which conclusion is supported?",
    "Les mesures respectent les limites fournies, mais un rapport LLDP récent nomme l’équipement C au lieu de B prévu. Quelle conclusion est étayée ?"
  ],
  [
    "The assigned connection is verified because light is healthy.",
    "La connexion prévue est vérifiée puisque la lumière est correcte."
  ],
  [
    "The reported endpoint disagrees with FIM; investigate the mapping even though light is present.",
    "L’extrémité signalée diffère de FIM ; vérifiez l’affectation même si la lumière est présente."
  ],
  [
    "The first CAS must be generating the wrong LLDP identity.",
    "Le premier CAS doit produire une mauvaise identité LLDP."
  ],
  [
    "The local optic is proven defective.",
    "L’optique locale est prouvée défectueuse."
  ],
  [
    "Light being present and reaching the intended device are different checks. Compare the reported device and port with FIM, labels and actual patching. Passive cassettes do not generate LLDP identities, and this mismatch alone does not diagnose a failed optic.",
    "La présence de lumière et la bonne destination sont deux contrôles distincts. Comparez l’équipement et le port signalés à FIM, aux étiquettes et au raccordement réel. Les cassettes passives ne créent pas d’identité LLDP, et cet écart seul ne diagnostique pas une optique défectueuse."
  ],
  [
    "Healthy light does not prove the correct destination.",
    "Une lumière correcte ne prouve pas la bonne destination."
  ],
  [
    "Read power against its limits",
    "Comparer la puissance à ses limites"
  ],
  [
    "Interpret a missing neighbor",
    "Interpréter l’absence de voisin"
  ],
  [
    "Cable Guy shows no LLDP neighbor. You have not checked fresh light readings, link state or LLDP operation. What can you conclude?",
    "Cable Guy n’affiche aucun voisin LLDP. Vous n’avez pas vérifié les mesures récentes, l’état de liaison ou LLDP. Que pouvez-vous conclure ?"
  ],
  [
    "The fiber is definitely broken.",
    "La fibre est forcément cassée."
  ],
  [
    "The remote device is definitely in the wrong port.",
    "L’équipement distant est forcément sur le mauvais port."
  ],
  [
    "Both optics are healthy because LLDP is separate from light.",
    "Les deux optiques fonctionnent puisque LLDP est distinct de la lumière."
  ],
  [
    "The neighbor is unconfirmed; check light, link state and whether LLDP is operating before naming a cause.",
    "Le voisin n’est pas confirmé ; vérifiez la lumière, la liaison et le fonctionnement LLDP avant de nommer une cause."
  ],
  [
    "A missing neighbor does not locate a fiber fault. The link may be down, or LLDP may not be sending or receiving. Use a fresh report, check TX/RX and link state, and verify LLDP operation with the appropriate team.",
    "L’absence de voisin ne localise pas un défaut de fibre. La liaison peut être inactive, ou LLDP peut ne pas émettre ou recevoir. Utilisez un rapport récent, vérifiez TX/RX et la liaison, puis faites vérifier LLDP par l’équipe concernée."
  ],
  [
    "No neighbor is an observation, not a diagnosis.",
    "Aucun voisin est une observation, pas un diagnostic."
  ],
  [
    "Training illustration",
    "Illustration pédagogique"
  ],
  [
    "{0}, 32 ports in two rows",
    "{0}, 32 ports sur deux rangées"
  ],
  [
    "Correct answer.",
    "Bonne réponse."
  ],
  [
    "Your answer; review this choice.",
    "Votre réponse ; revoyez ce choix."
  ],
  [
    "LC cable",
    "Câble LC"
  ],
  [
    "Connector A: its nose meets the adapter, with no visible gap.",
    "Connecteur A : son extrémité touche l’adaptateur, sans espace visible."
  ],
  [
    "Connector B: a visible gap separates its nose from the adapter.",
    "Connecteur B : un espace visible sépare son extrémité de l’adaptateur."
  ],
  [
    "Cable Guy · training report",
    "Cable Guy · rapport pédagogique"
  ],
  [
    "Local optic · training report",
    "Optique locale · rapport pédagogique"
  ],
  [
    "One connection cleaned and reseated",
    "Une connexion nettoyée et réenclenchée"
  ],
  [
    "Link status has not been checked yet.",
    "L’état de la liaison n’a pas encore été vérifié."
  ],
  [
    "Allowed here:",
    "Autorisé ici :"
  ],
  [
    "{7} to +{8}",
    "{7} à +{8}"
  ],
  [
    "Training limits only · use the installed optic’s limits on site",
    "Limites pédagogiques · sur site, utilisez celles de l’optique installée"
  ],
  [
    "A · Optic → CAS 1",
    "A · Optique → CAS 1"
  ],
  [
    "C · Beyond CAS 2",
    "C · Au-delà de CAS 2"
  ],
  [
    "Checked to CAS 1",
    "Vérifié jusqu’à CAS 1"
  ],
  [
    "First section",
    "Première section"
  ],
  [
    "Loop here: pass",
    "Boucle ici : réussite"
  ],
  [
    "Suspect span + connections",
    "Section suspecte + connexions"
  ],
  [
    "Added section",
    "Section ajoutée"
  ],
  [
    "CAS 2 · Port 12",
    "CAS 2 · port 12"
  ],
  [
    "Loop here: fail",
    "Boucle ici : échec"
  ],
  [
    "Not tested",
    "Non testé"
  ],
  [
    "Remote device · other room / building · not tested",
    "Équipement distant · autre salle / bâtiment · non testé"
  ],
  [
    "A · Local TX",
    "A · TX local"
  ],
  [
    "B · Local RX",
    "B · RX local"
  ],
  [
    "Remote",
    "Distant"
  ],
  [
    "Same link, two directions. You are at the local end.",
    "Même liaison, deux sens. Vous êtes à l’extrémité locale."
  ],
  [
    "Blue illustrates invisible IR; arrows show direction.",
    "Le bleu illustre l’IR invisible ; les flèches indiquent le sens."
  ],
  [
    "CAS · enlarged ports",
    "CAS · ports agrandis"
  ],
  [
    "Check both ends",
    "Vérifier les deux extrémités"
  ],
  [
    "Expected: 12 · detected: {0}",
    "Attendu : 12 · détecté : {0}"
  ],
  [
    "VFL + fiber section · setup to verify",
    "VFL + section de fibre · montage à vérifier"
  ],
  [
    "On an isolated fiber, VFL light is detected at Port {0}. The expected destination is Port 12.",
    "Sur une fibre isolée, la lumière VFL est détectée au port {0}. La destination attendue est le port 12."
  ],
  [
    "VFL tool and a fiber section to prepare for testing.",
    "VFL et section de fibre à préparer pour le test."
  ],
  [
    "Active",
    "Actif"
  ],
  [
    "End A",
    "Extrémité A"
  ],
  [
    "End B",
    "Extrémité B"
  ],
  [
    "Both ends disconnected from active gear",
    "Deux extrémités déconnectées des équipements actifs"
  ],
  [
    "Confirm how BOTH ends are connected",
    "Confirmez le raccordement des DEUX extrémités"
  ],
  [
    "✓ Matching adapter",
    "✓ Adaptateur adapté"
  ],
  [
    "Check the adapter too",
    "Vérifiez aussi l’adaptateur"
  ],
  [
    "Ready for the site-approved tracing procedure",
    "Prêt pour la procédure de traçage approuvée du site"
  ],
  [
    "VFL stays disconnected while you verify",
    "Le VFL reste déconnecté pendant la vérification"
  ],
  [
    "Both ends of the fiber section are disconnected from active equipment. The VFL adapter matches.",
    "Les deux extrémités de la section sont déconnectées des équipements actifs. L’adaptateur VFL est adapté."
  ],
  [
    "Two fiber ends and active equipment. Question marks mean their connection status must be confirmed; the VFL is not attached.",
    "Deux extrémités de fibre et équipements actifs. Les points d’interrogation indiquent que leur raccordement reste à confirmer ; le VFL n’est pas connecté."
  ],
  [
    "Check the two ends of the section you plan to trace.",
    "Vérifiez les deux extrémités de la section à tracer."
  ],
  [
    "Before · tight bend",
    "Avant · courbure serrée"
  ],
  [
    "After · bend removed",
    "Après · courbure corrigée"
  ],
  [
    "Optic · RX",
    "Optique · RX"
  ],
  [
    "{0}. Fiber leads into the receiving optic. RX reads {1} dBm.",
    "{0}. La fibre rejoint l’optique réceptrice. RX indique {1} dBm."
  ],
  [
    "−4.00 is below the −3.00 minimum. Keep checking.",
    "−4.00 est sous le minimum de −3.00. Continuez les vérifications."
  ],
  [
    "Allowed RX in this example",
    "RX autorisé dans cet exemple"
  ],
  [
    "Training readings and limits. RX measures the light arriving at the optic.",
    "Mesures et limites pédagogiques. RX mesure la lumière arrivant à l’optique."
  ],
  [
    "Device C",
    "Équipement C"
  ],
  [
    "LLDP · Link Layer Discovery Protocol",
    "LLDP · Link Layer Discovery Protocol"
  ],
  [
    "Fresh Cable Guy report · local Device A / 25/1",
    "Rapport Cable Guy récent · équipement local A / 25/1"
  ],
  [
    "Unconfirmed",
    "Non confirmé"
  ],
  [
    "No neighbor reported",
    "Aucun voisin signalé"
  ],
  [
    "Remote · {0}",
    "Distant · {0}"
  ],
  [
    "“I’m Device B. My port is 7/1.”",
    "« Je suis l’équipement B. Mon port est 7/1. »"
  ],
  [
    "Message received by Device A over this link",
    "Message reçu par A sur cette liaison"
  ],
  [
    "No neighbor",
    "Aucun voisin"
  ],
  [
    "Identity unconfirmed",
    "Identité non confirmée"
  ],
  [
    "Port {0}",
    "Port {0}"
  ],
  [
    "FIM expects",
    "FIM prévoit"
  ],
  [
    "Port 7/1",
    "Port 7/1"
  ],
  [
    "LLDP reports",
    "LLDP indique"
  ],
  [
    "TX / RX within example limits",
    "TX / RX dans les limites d’exemple"
  ],
  [
    "Expected endpoint still needs confirmation",
    "Extrémité attendue encore à confirmer"
  ],
  [
    "Local · 25/1",
    "Local · 25/1"
  ],
  [
    "Passive fiber path",
    "Chemin de fibre passif"
  ],
  [
    "Connection {0}",
    "Connexion {0}"
  ],
  [
    "Side views · tap a connection",
    "Vues latérales · touchez une connexion"
  ],
  [
    "Connector after inspection and reseating",
    "Connecteur après inspection et réenclenchement"
  ],
  [
    "RX after reseating",
    "RX après réenclenchement"
  ],
  [
    "Inspection image · isolated connector",
    "Image d’inspection · connecteur isolé"
  ],
  [
    "Inspection view showing particles on the connector end face.",
    "Vue d’inspection montrant des particules sur la face du connecteur."
  ],
  [
    "Cable-management clip",
    "Attache de gestion des câbles"
  ],
  [
    "Cable squeezed under the clip",
    "Câble comprimé sous l’attache"
  ],
  [
    "No tear visible in the outer covering",
    "Aucune déchirure visible de la gaine"
  ],
  [
    "Fiber cable squeezed under a management clip. Its outer covering has no visible tear.",
    "Câble fibre comprimé sous une attache. Sa gaine ne présente aucune déchirure visible."
  ],
  [
    "Mock FIM destination",
    "Destination FIM simulée"
  ],
  [
    "Top: 1–16 · Bottom: 17–32. Scroll to see every port.",
    "Haut : 1–16 · Bas : 17–32. Faites défiler pour voir tous les ports."
  ],
  [
    "CAS 2 cassette, scroll horizontally for all 32 ports",
    "Cassette CAS 2, faites défiler horizontalement pour voir les 32 ports"
  ],
  [
    "Recheck + record",
    "Revérifier + consigner"
  ],
  [
    "Next observation?",
    "Prochaine observation ?"
  ],
  [
    "Observe the result after the change.",
    "Observez le résultat après le changement."
  ],
  [
    "No new health reading has been taken.",
    "Aucune nouvelle mesure optique n’a été prise."
  ],
  [
    "Connector reseated",
    "Connecteur réenclenché"
  ],
  [
    "Device",
    "Équipement"
  ],
  [
    "Data → light / received light → data",
    "Données → lumière / lumière reçue → données"
  ],
  [
    "What happens inside this module?",
    "Que se passe-t-il dans ce module ?"
  ],
  [
    "A device connects through an optic module to a fiber.",
    "Un équipement se raccorde à une fibre par un module optique."
  ],
  [
    "RX lane {0}",
    "Voie RX {0}"
  ],
  [
    "Cable Guy · four receive lanes",
    "Cable Guy · quatre voies de réception"
  ],
  [
    "Approved direct LC loopback at the local optic. The loop test passed.",
    "Boucle LC directe approuvée sur l’optique locale. Le test a réussi."
  ],
  [
    "Restored link: still failing",
    "Liaison normalisée : toujours en échec"
  ],
  [
    "The remote device is in another room.",
    "L’équipement distant est dans une autre salle."
  ],
  [
    "Intermediate",
    "Intermédiaire"
  ],
  [
    "Beginner",
    "Débutant"
  ],
  [
    "Practice",
    "Entraînement"
  ],
  [
    "Exam",
    "Examen"
  ],
  [
    "{0} in progress",
    "{0} en cours"
  ],
  [
    "{1} · Question {2} of {3}",
    "{1} · Question {2} sur {3}"
  ],
  [
    "Resume {4}",
    "Reprendre {4}"
  ],
  [
    "Foundations",
    "Bases"
  ],
  [
    "Applied troubleshooting",
    "Dépannage appliqué"
  ],
  [
    "Recognize parts, read the signs and make the basic checks.",
    "Reconnaître les composants, lire les signes et effectuer les contrôles de base."
  ],
  [
    "Combine observations, explain the limits of a test and choose your next check.",
    "Croiser les observations, expliquer les limites d’un test et choisir le prochain contrôle."
  ],
  [
    "{5} of {6} exams passed · choose any exam",
    "Examens réussis : {5}/{6} · choisissez librement"
  ],
  [
    "Open {7} →",
    "Ouvrir {7} →"
  ],
  [
    "Choose a level. Every exam has five questions and draws from the chapters.",
    "Choisissez un niveau. Chaque examen comporte cinq questions tirées des chapitres."
  ],
  [
    "My progress · {0}",
    "Ma progression · {0}"
  ],
  [
    "Beginner includes four knowledge exams and hands-on patching. Intermediate combines those ideas in mixed scenarios. Choose any exam; there is no required order.",
    "Le niveau débutant comprend quatre examens de connaissances et un de raccordement pratique. Le niveau intermédiaire combine ces notions dans des scénarios variés. Choisissez librement ; aucun ordre n’est imposé."
  ],
  [
    "Explore the chapters",
    "Explorer les chapitres"
  ],
  [
    "Understand the parts, interpret a clear observation and choose a sensible first check.",
    "Comprenez les composants, interprétez une observation claire et choisissez un premier contrôle pertinent."
  ],
  [
    "Use the same chapter knowledge in situations with several clues. Separate what is known from what still needs checking.",
    "Appliquez les mêmes connaissances à des situations avec plusieurs indices. Distinguez ce qui est connu de ce qui reste à vérifier."
  ],
  [
    "Pass each knowledge exam with 4/5 to advance from Fiber Learner through Fiber Apprentice I–IV. Patching has its own result.",
    "Réussissez chaque examen de connaissances avec 4/5 pour passer d’Élève fibre aux niveaux Apprenti fibre I–IV. Le raccordement a son propre résultat."
  ],
  [
    "Not taken",
    "Non passé"
  ],
  [
    "✓ Passed",
    "✓ Réussi"
  ],
  [
    "Keep practicing",
    "Continuez à vous entraîner"
  ],
  [
    "{0} · Best result {1}/5",
    "{0} · Meilleur résultat {1}/5"
  ],
  [
    "Start exam",
    "Commencer l’examen"
  ],
  [
    "Retake exam",
    "Repasser l’examen"
  ],
  [
    "Hands-on patching",
    "Raccordement pratique"
  ],
  [
    "Place LC and MMC connectors from a mock FIM ticket, including a flipped optic.",
    "Placez les connecteurs LC et MMC selon une fiche FIM simulée, y compris sur une optique retournée."
  ],
  [
    "Open patching exam →",
    "Ouvrir l’examen de raccordement →"
  ],
  [
    "Knowledge-exam best results include retries.",
    "Les meilleurs résultats des examens de connaissances incluent les nouvelles tentatives."
  ],
  [
    "Intermediate best scores use complete exam attempts; practice retries do not replace them.",
    "Les meilleurs résultats intermédiaires proviennent d’examens complets ; les essais d’entraînement ne les remplacent pas."
  ],
  [
    "Scores stay in this browser on this device. {0}",
    "Les résultats restent dans ce navigateur sur cet appareil. {0}"
  ],
  [
    "This browser cannot save progress. You can still choose any exam; results last for this visit.",
    "Ce navigateur ne peut pas enregistrer la progression. Vous pouvez choisir tout examen ; les résultats durent cette visite."
  ],
  [
    "Learn the basics first",
    "Apprendre les bases d’abord"
  ],
  [
    "Review the worked examples",
    "Revoir les exemples expliqués"
  ],
  [
    "← Exam levels",
    "← Niveaux d’examen"
  ],
  [
    "5 questions per exam · choose freely",
    "5 questions par examen · libre choix"
  ],
  [
    "Earned",
    "Obtenu"
  ],
  [
    "Not yet earned",
    "Pas encore obtenu"
  ],
  [
    "· Best {0}/5",
    "· Meilleur {0}/5"
  ],
  [
    "Take exam",
    "Passer l’examen"
  ],
  [
    "Retake",
    "Repasser"
  ],
  [
    "Current",
    "Actuel"
  ],
  [
    "Not earned",
    "Non obtenu"
  ],
  [
    "Fiber Apprentice {2} · {3}",
    "Apprenti fibre {2} · {3}"
  ],
  [
    "Saved only in this browser. Clearing site data removes your progress.",
    "Enregistré uniquement dans ce navigateur. Effacer les données du site supprime votre progression."
  ],
  [
    "This browser cannot save progress. Results last for this visit.",
    "Ce navigateur ne peut pas enregistrer la progression. Les résultats durent cette visite."
  ],
  [
    "← Exams",
    "← Examens"
  ],
  [
    "Fiber Apprentice tier designs",
    "Modèles des niveaux Apprenti fibre"
  ],
  [
    "Your badges",
    "Vos badges"
  ],
  [
    "{3} of 7 earned",
    "{3} obtenus sur 7"
  ],
  [
    "Earn a badge by passing its exam with 4/5 or better.",
    "Obtenez un badge en réussissant son examen avec au moins 4/5."
  ],
  [
    "Intermediate progress",
    "Progression intermédiaire"
  ],
  [
    "{0} of 2 Intermediate exams passed",
    "{0} examens intermédiaires réussis sur 2"
  ],
  [
    "Pass with 4/5 on a complete attempt. Review feedback and practice missed questions, then retake the full exam to improve your saved score.",
    "Réussissez avec 4/5 sur une tentative complète. Revoyez les explications et entraînez-vous aux questions manquées, puis repassez l’examen entier pour améliorer votre résultat enregistré."
  ],
  [
    "Play",
    "Lancer"
  ],
  [
    "Pause",
    "Suspendre"
  ],
  [
    "Question",
    "Question"
  ],
  [
    "Tap your answer in the picture. Keyboard: Tab, then Enter.",
    "Touchez votre réponse dans l’image. Au clavier : Tab, puis Entrée."
  ],
  [
    "Select all supported answers.",
    "Sélectionnez toutes les réponses étayées."
  ],
  [
    "Select all that could cause it.",
    "Sélectionnez toutes les causes possibles."
  ],
  [
    "{0} Then check your answers.",
    "{0} Puis vérifiez vos réponses."
  ],
  [
    "Check answers",
    "Vérifier les réponses"
  ],
  [
    "Finish this round",
    "Terminer cette série"
  ],
  [
    "← {0} exams",
    "← Examens {0}"
  ],
  [
    "{1} explanation animations",
    "{1} les animations explicatives"
  ],
  [
    "{2} motion",
    "{2} les animations"
  ],
  [
    "{3} {4} of {5}",
    "{3} {4} sur {5}"
  ],
  [
    "Questions answered",
    "Questions répondues"
  ],
  [
    "{0} motion",
    "{0} les animations"
  ],
  [
    "{0} explanation animations",
    "{0} les animations explicatives"
  ],
  [
    "Your answer · correct",
    "Votre réponse · correcte"
  ],
  [
    "Also correct · not selected",
    "Également correcte · non sélectionnée"
  ],
  [
    "Correct answer",
    "Bonne réponse"
  ],
  [
    "Your answer · not supported",
    "Votre réponse · non étayée"
  ],
  [
    "Your answer",
    "Votre réponse"
  ],
  [
    "✓ Good call. Here’s why.",
    "✓ Bon choix. Voici pourquoi."
  ],
  [
    "Here’s what the evidence tells us.",
    "Voici ce que les observations permettent de conclure."
  ],
  [
    "Supported",
    "Étayé"
  ],
  [
    "Not supported",
    "Non étayé"
  ],
  [
    "Review the illustrated lesson",
    "Revoir la leçon illustrée"
  ],
  [
    "(opens in a new tab)",
    "(s’ouvre dans un nouvel onglet)"
  ],
  [
    "All four knowledge exams passed. Hands-on patching has its own result.",
    "Les quatre examens de connaissances sont réussis. Le raccordement pratique a son propre résultat."
  ],
  [
    "Get 4/5 in this exam to earn your next Apprentice level.",
    "Obtenez 4/5 à cet examen pour gagner le prochain niveau Apprenti."
  ],
  [
    "Your earned level stays while you practice.",
    "Votre niveau acquis reste conservé pendant l’entraînement."
  ],
  [
    "One Apprentice level for each beginner knowledge exam passed.",
    "Un niveau Apprenti par examen débutant de connaissances réussi."
  ],
  [
    "Apprentice level earned",
    "Niveau Apprenti obtenu"
  ],
  [
    "Your earned rank",
    "Votre rang acquis"
  ],
  [
    "Your first Apprentice level is next",
    "Votre premier niveau Apprenti vous attend"
  ],
  [
    "· Knowledge rounds complete",
    "· Séries de connaissances terminées"
  ],
  [
    "Beginner · {3}",
    "Débutant · {3}"
  ],
  [
    "{5} of 4 knowledge exams passed{6}",
    "{5} examens de connaissances réussis sur 4{6}"
  ],
  [
    "Practice complete",
    "Entraînement terminé"
  ],
  [
    "A little more practice",
    "Encore un peu d’entraînement"
  ],
  [
    "Intermediate exam passed",
    "Examen intermédiaire réussi"
  ],
  [
    "Knowledge rounds complete",
    "Séries de connaissances terminées"
  ],
  [
    "Round complete",
    "Série terminée"
  ],
  [
    "answered correctly after practice",
    "réponses correctes après entraînement"
  ],
  [
    "correct on your first answer",
    "réponses correctes au premier essai"
  ],
  [
    "Practice does not change the saved exam score.",
    "L’entraînement ne modifie pas le résultat d’examen enregistré."
  ],
  [
    "Full exam: {0}/5. This retry: {1}/{2}.{3}",
    "Examen complet : {0}/5. Cet essai : {1}/{2}.{3}"
  ],
  [
    "What you showed",
    "Vos acquis"
  ],
  [
    "Practice next",
    "À travailler ensuite"
  ],
  [
    "You can revisit an idea or choose any other exam.",
    "Vous pouvez revoir une notion ou choisir un autre examen."
  ],
  [
    "Review the ideas below and retry the missed questions. Aim for four correct answers out of five.",
    "Revoyez les notions ci-dessous et retentez les questions manquées. Visez quatre bonnes réponses sur cinq."
  ],
  [
    "Progress could not be saved in this browser. It will last for this visit.",
    "La progression n’a pas pu être enregistrée dans ce navigateur. Elle durera cette visite."
  ],
  [
    "Try the next 5 questions",
    "Essayer les 5 questions suivantes"
  ],
  [
    "Retry {1} missed {2}",
    "Retenter {1} {2} manquée(s)"
  ],
  [
    "Retake this exam",
    "Repasser cet examen"
  ],
  [
    "Retake with a fresh mix",
    "Repasser avec un nouveau mélange"
  ],
  [
    "Your answer: {1}",
    "Votre réponse : {1}"
  ],
  [
    "Correct:",
    "Correct :"
  ],
  [
    "Review lesson ↗",
    "Revoir la leçon ↗"
  ],
  [
    "Ideas to revisit",
    "Notions à revoir"
  ],
  [
    "{0} · {1} · {2} complete",
    "{0} · {1} · {2} terminé"
  ],
  [
    "Skills from this round",
    "Compétences de cette série"
  ],
  [
    "Choose another exam",
    "Choisir un autre examen"
  ],
  [
    "Stop here · back to lessons",
    "Arrêter ici · retour aux leçons"
  ],
  [
    "Use Troubleshoot →",
    "Utiliser Dépanner →"
  ],
  [
    "Rear · 12",
    "Arrière · 12"
  ],
  [
    "CAS 1 · Port 12 · side cutaway",
    "CAS 1 · port 12 · coupe latérale"
  ],
  [
    "Front",
    "Avant"
  ],
  [
    "Behind",
    "Arrière"
  ],
  [
    "From LC legs",
    "Depuis les branches LC"
  ],
  [
    "Path continues",
    "Suite du chemin"
  ],
  [
    "Example rack · front view",
    "Baie d’exemple · vue de face"
  ],
  [
    "Training rack · illustrative elevations",
    "Baie pédagogique · hauteurs illustratives"
  ],
  [
    "Optic 5 · TX starts here",
    "Optique 5 · départ de TX"
  ],
  [
    "Optic 5 → LC leg → MMC → CAS 1 / 12",
    "Optique 5 → branche LC → MMC → CAS 1 / 12"
  ],
  [
    "Dashed section runs behind the CAS.",
    "La section en pointillés passe derrière le CAS."
  ],
  [
    "MMC head connects at the front.",
    "La tête MMC se raccorde à l’avant."
  ],
  [
    "TX starts at optic 5, elevation {0}: LC leg → MMC head → CAS 1 Port 12 ({1}) → onward fiber. IR light is invisible; blue arrows illustrate its direction.",
    "TX part de l’optique 5, hauteur {0} : branche LC → tête MMC → CAS 1 port 12 ({1}) → fibre suivante. L’IR est invisible ; les flèches bleues illustrent son sens."
  ],
  [
    "DEVICE A · {0} data",
    "ÉQUIPEMENT A · {0} des données"
  ],
  [
    "DEVICE B · {0} data",
    "ÉQUIPEMENT B · {0} des données"
  ],
  [
    "Fiber between cassettes",
    "Fibre entre cassettes"
  ],
  [
    "data → TX",
    "données → TX"
  ],
  [
    "RX → data",
    "RX → données"
  ],
  [
    "Device {0} · {1}",
    "Équipement {0} · {1}"
  ],
  [
    "Device A · elevation 30",
    "Équipement A · hauteur 30"
  ],
  [
    "Device B · elevation 30",
    "Équipement B · hauteur 30"
  ],
  [
    "LOCAL · YOU ARE HERE",
    "LOCAL · VOUS ÊTES ICI"
  ],
  [
    "REMOTE",
    "DISTANT"
  ],
  [
    "Rack 17 · elevation 30",
    "Baie 17 · hauteur 30"
  ],
  [
    "Other rack · find in FIM",
    "Autre baie · voir FIM"
  ],
  [
    "LC leg",
    "Branche LC"
  ],
  [
    "Device B · other end",
    "Équipement B · autre extrémité"
  ],
  [
    "{0}1 · rack CAS",
    "{0}1 · CAS de baie"
  ],
  [
    "A sends → B receives",
    "A émet → B reçoit"
  ],
  [
    "A receives ← B sends",
    "A reçoit ← B émet"
  ],
  [
    "Optic → LC leg → MMC / CAS → other end",
    "Optique → branche LC → MMC / CAS → autre extrémité"
  ],
  [
    "B is local; A is remote.",
    "B est local ; A est distant."
  ],
  [
    "A is local; B is remote.",
    "A est local ; B est distant."
  ],
  [
    "{0} Each optic makes its own TX light. Follow it to the other optic’s RX. The CAS passes that light onward.",
    "{0} Chaque optique produit sa propre lumière TX. Suivez-la jusqu’à RX de l’autre optique. Le CAS transmet cette lumière."
  ],
  [
    "Worked example",
    "Exemple expliqué"
  ],
  [
    "Too low",
    "Trop faible"
  ],
  [
    "Too high",
    "Trop fort"
  ],
  [
    "RX limits −3 to +3 dBm. −4.20 is below the minimum, +0.25 is inside, and +3.80 is above the maximum.",
    "Limites RX de −3 à +3 dBm. −4.20 est sous le minimum, +0.25 est dans la plage et +3.80 dépasse le maximum."
  ],
  [
    "Read a range, not a target number",
    "Lire une plage, pas une valeur cible"
  ],
  [
    "Start with the installed optic’s lower and upper limits. TX and RX can have different limits.",
    "Commencez par les limites basse et haute de l’optique installée. TX et RX peuvent avoir des limites différentes."
  ],
  [
    "Worked example · RX allowed −3.00 to +3.00 dBm",
    "Exemple expliqué · RX autorisé de −3.00 à +3.00 dBm"
  ],
  [
    "More negative means weaker power:",
    "Plus négatif signifie une puissance plus faible :"
  ],
  [
    "−4.20 is below −3.00",
    "−4.20 est inférieur à −3.00"
  ],
  [
    ". Above the upper limit is also out of range. Zero is not a required target; TX and RX do not have to match.",
    ". Dépasser la limite haute est aussi hors plage. Zéro n’est pas une cible obligatoire ; TX et RX n’ont pas besoin d’être identiques."
  ],
  [
    "A −40 report is this site’s no-light indication, not a diagnosis. Check each required lane against its own limits, then check link status. These example limits are not universal.",
    "Un rapport −40 indique l’absence de lumière sur ce site, pas un diagnostic. Comparez chaque voie requise à ses limites, puis vérifiez la liaison. Ces limites d’exemple ne sont pas universelles."
  ],
  [
    "Move the loop, grow the tested section",
    "Déplacer la boucle pour étendre la section testée"
  ],
  [
    "Worked case: same pair, valid loop mapping and attenuation, no other changes between tests. Explore each step.",
    "Cas expliqué : même paire, affectation et atténuation de boucle valides, aucun autre changement entre les tests. Explorez chaque étape."
  ],
  [
    "Worked loop sequence",
    "Séquence de boucles expliquée"
  ],
  [
    "1 · Direct loop",
    "1 · Boucle directe"
  ],
  [
    "2 · Loop at CAS 1",
    "2 · Boucle à CAS 1"
  ],
  [
    "3 · Loop at CAS 2",
    "3 · Boucle à CAS 2"
  ],
  [
    "Compare the last passing test with the next failure. Investigate the added fiber",
    "Comparez le dernier test réussi au prochain échec. Examinez la fibre ajoutée"
  ],
  [
    "and its connections",
    "et ses connexions"
  ],
  [
    ". Recheck the failed loop setup first. A failure does not prove a break or name its exact position.",
    ". Revérifiez d’abord le montage de la boucle en échec. Un échec ne prouve pas une cassure et n’en donne pas l’emplacement exact."
  ],
  [
    "Only extend to passives you can access. Beyond the loop and the remote optic remain unverified; one pair does not prove every channel.",
    "Étendez uniquement aux passifs accessibles. Au-delà de la boucle et à l’optique distante, rien n’est vérifié ; une paire ne prouve pas tous les canaux."
  ],
  [
    "Ferrule aligns the fibers at the mating face",
    "La férule aligne les fibres à la face de contact"
  ],
  [
    "Enlarged MMC head. The ferrule at the mating face aligns the fibers.",
    "Tête MMC agrandie. La férule à la face de contact aligne les fibres."
  ],
  [
    "Illustrative poor alignment at a fiber joint",
    "Exemple de mauvais alignement à une jonction"
  ],
  [
    "Two fiber ends with a misalignment inside an illustrative splice area.",
    "Deux extrémités de fibre mal alignées dans une zone d’épissure illustrative."
  ],
  [
    "One dark channel can have several causes",
    "Un canal sans lumière peut avoir plusieurs causes"
  ],
  [
    "MMC ferrule",
    "Férule MMC"
  ],
  [
    "The ferrule holds and aligns fibers. Dirt or damage at this interface can affect one or more paths.",
    "La férule maintient et aligne les fibres. Saleté ou dommage à cette interface peuvent affecter un ou plusieurs chemins."
  ],
  [
    "Fiber or splice",
    "Fibre ou épissure"
  ],
  [
    "A bend, break or poor splice can reduce or interrupt light. The same symptom can also come from seating or mapping.",
    "Une courbure, une cassure ou une mauvaise épissure peuvent réduire ou interrompre la lumière. Le même symptôme peut venir de l’enclenchement ou de l’affectation."
  ],
  [
    "Working neighbors do not prove the affected channel is healthy. Track its own mapped route. A dark reading alone cannot distinguish dirt, ferrule damage, a fiber defect or a splice issue.",
    "Des canaux voisins fonctionnels ne prouvent pas que le canal concerné fonctionne. Suivez son chemin prévu. Une absence de lumière seule ne distingue pas saleté, férule endommagée, défaut de fibre ou problème d’épissure."
  ],
  [
    "Reference:",
    "Référence :"
  ],
  [
    "US Conec · MMC ferrule performance ↗",
    "US Conec · performances de la férule MMC ↗"
  ],
  [
    "Connect a change to its result",
    "Relier un changement à son résultat"
  ],
  [
    "Record reading",
    "Noter la mesure"
  ],
  [
    "Make one change",
    "Faire un changement"
  ],
  [
    "Retest + record",
    "Retester + noter"
  ],
  [
    "Worked example:",
    "Exemple expliqué :"
  ],
  [
    "RX is −8.00. You widen a tight bend",
    "RX vaut −8.00. Vous élargissez une courbure serrée"
  ],
  [
    "reseat the connector before measuring +0.25. The path improved, but you cannot tell which change helped or how much each contributed.",
    "réenclenchez le connecteur avant de mesurer +0.25. Le chemin s’est amélioré, mais vous ne savez pas quel changement a aidé ni la contribution de chacun."
  ],
  [
    "If instead RX improves only to −4.00 with a −3.00 minimum, it is still too low. Keep investigating. Even an in-range reading leaves other required lanes and link status to check.",
    "Si RX ne monte qu’à −4.00 avec un minimum de −3.00, il reste trop faible. Continuez l’investigation. Même une mesure dans la plage laisse les autres voies requises et la liaison à vérifier."
  ],
  [
    "Expected port + strand found",
    "Port + fibre attendus trouvés"
  ],
  [
    "VFL light reaches the expected destination on an isolated strand.",
    "La lumière VFL atteint la destination attendue sur une fibre isolée."
  ],
  [
    "Two tests, two different pieces of evidence",
    "Deux tests, deux indices différents"
  ],
  [
    "This supports continuity and the mapped destination for that strand.",
    "Cela étaye la continuité et la destination prévue pour cette fibre."
  ],
  [
    "Restored service reading",
    "Mesure après normalisation"
  ],
  [
    "Example limits: −3.00 to +3.00 dBm. Some light arrives, but it is below the minimum.",
    "Limites d’exemple : −3.00 à +3.00 dBm. De la lumière arrive, mais sous le minimum."
  ],
  [
    "A visible trace does not prove acceptable IR loss. Check connections and measure loss with the appropriate source / meter or loss test set. Restore the mapped path and verify the required readings and link.",
    "Un traçage visible ne prouve pas une perte IR acceptable. Vérifiez les connexions et mesurez la perte avec la source / le photomètre ou l’appareil de test adapté. Normalisez le chemin prévu et vérifiez les mesures requises et la liaison."
  ],
  [
    "Change your viewpoint, keep the same light paths",
    "Changer de point de vue, garder les mêmes chemins lumineux"
  ],
  [
    "Mapped fiber + passives",
    "Fibre prévue + passifs"
  ],
  [
    "At A, this is your outgoing path. Walk to B, and the same path becomes your incoming path. TX still sends; RX still receives.",
    "À A, c’est votre chemin sortant. Allez à B : le même chemin devient entrant. TX émet toujours ; RX reçoit toujours."
  ],
  [
    "At B, TX is in range but RX is dark. Investigate A’s source → mapped fiber and interfaces → B’s receiver. B’s healthy TX report does not prove that A receives B’s outgoing light. Leave inaccessible sections unverified.",
    "À B, TX est dans la plage mais RX ne reçoit rien. Examinez la source de A → fibre et interfaces prévues → récepteur de B. Le bon TX de B ne prouve pas que A reçoit sa lumière. Laissez les sections inaccessibles non vérifiées."
  ],
  [
    "Unknown device",
    "Équipement inconnu"
  ],
  [
    "Not identified",
    "Non identifié"
  ],
  [
    "Passes fiber",
    "Transmet par la fibre"
  ],
  [
    "LLDP — Link Layer Discovery Protocol",
    "LLDP — Link Layer Discovery Protocol"
  ],
  [
    "Devices use LLDP to announce their",
    "Avec LLDP, les équipements annoncent leur"
  ],
  [
    "name + port",
    "nom + port"
  ],
  [
    "over the existing connection. It helps you confirm who is connected.",
    "sur la connexion existante. Cela aide à confirmer qui est connecté."
  ],
  [
    "What the LLDP acronym means",
    "Signification de l’acronyme LLDP"
  ],
  [
    "Link Layer",
    "Link Layer"
  ],
  [
    "On this direct link",
    "Sur cette liaison directe"
  ],
  [
    "Discovery",
    "Discovery"
  ],
  [
    "Identify the other end",
    "Identifier l’autre extrémité"
  ],
  [
    "Protocol",
    "Protocol"
  ],
  [
    "Shared messaging rules",
    "Règles communes de communication"
  ],
  [
    "Start with local and remote",
    "Commencer par local et distant"
  ],
  [
    "Local = the device you’re checking",
    "Local = équipement que vous vérifiez"
  ],
  [
    "At Device A",
    "À l’équipement A"
  ],
  [
    "At Device B",
    "À l’équipement B"
  ],
  [
    "▶ Follow the name",
    "▶ Suivre le nom"
  ],
  [
    "Blue tag = LLDP message",
    "Étiquette bleue = message LLDP"
  ],
  [
    "Now read the neighbor in Cable Guy",
    "Lisez maintenant le voisin dans Cable Guy"
  ],
  [
    "LLDP calls the remote device a neighbor:",
    "LLDP appelle l’équipement distant un voisin :"
  ],
  [
    "the next active device on this link, even in another room. The CAS units only pass the fiber through.",
    "le prochain équipement actif sur cette liaison, même dans une autre salle. Les CAS ne font que transmettre par la fibre."
  ],
  [
    "Compare the reported neighbor’s name + port with FIM. Does it match?",
    "Comparez le nom + port du voisin signalé à FIM. Correspondent-ils ?"
  ],
  [
    "Try a different neighbor report",
    "Essayer un autre rapport de voisin"
  ],
  [
    "Match",
    "Correspond"
  ],
  [
    "Other device",
    "Autre équipement"
  ],
  [
    "Other port",
    "Autre port"
  ],
  [
    "Teaching example. Use a fresh report; old neighbors can remain briefly.",
    "Exemple pédagogique. Utilisez un rapport récent ; d’anciens voisins peuvent rester brièvement affichés."
  ],
  [
    "When LLDP helps",
    "Quand LLDP est utile"
  ],
  [
    "Missing label?",
    "Étiquette manquante ?"
  ],
  [
    "Identify the other end.",
    "Identifiez l’autre extrémité."
  ],
  [
    "Patch changed?",
    "Raccordement modifié ?"
  ],
  [
    "Check the destination.",
    "Vérifiez la destination."
  ],
  [
    "New connection?",
    "Nouvelle connexion ?"
  ],
  [
    "Compare with FIM.",
    "Comparez avec FIM."
  ],
  [
    "LLDP identifies the remote device. Your local report lists it as a neighbor.",
    "LLDP identifie l’équipement distant. Votre rapport local l’affiche comme voisin."
  ],
  [
    "Same connection, no extra cable. Check TX/RX separately for light health.",
    "Même connexion, aucun câble supplémentaire. Vérifiez TX/RX séparément pour l’état optique."
  ],
  [
    "Cisco · LLDP reference ↗",
    "Cisco · référence LLDP ↗"
  ],
  [
    "✓ Device and port match",
    "✓ Équipement et port correspondent"
  ],
  [
    "The expected device is on this link. Check TX/RX and link status too.",
    "L’équipement attendu est sur cette liaison. Vérifiez aussi TX/RX et l’état de liaison."
  ],
  [
    "≠ Expected {0}. Heard C.",
    "≠ Attendu {0}. Reçu C."
  ],
  [
    "Check the patching and FIM. A misport or an outdated record could explain this.",
    "Vérifiez le raccordement et FIM. Un mauvais port ou une fiche périmée pourraient expliquer cela."
  ],
  [
    "≠ Expected {0}. Heard {1}.",
    "≠ Attendu {0}. Reçu {1}."
  ],
  [
    "Check the exact port and FIM before changing the patch.",
    "Vérifiez le port exact et FIM avant de modifier le raccordement."
  ],
  [
    "? No identity reported",
    "? Aucune identité signalée"
  ],
  [
    "Check link status, optic readings and LLDP settings. This alone does not prove bad fiber.",
    "Vérifiez la liaison, les mesures optiques et les réglages LLDP. Cela seul ne prouve pas une fibre défectueuse."
  ],
  [
    "Receiving…",
    "Réception…"
  ],
  [
    "Not reported",
    "Non signalé"
  ],
  [
    "Name + port",
    "Nom + port"
  ],
  [
    "Cause unknown",
    "Cause inconnue"
  ],
  [
    "Message traveling to {0}…",
    "Message en route vers {0}…"
  ],
  [
    "Follow the blue ID tag on the existing fiber.",
    "Suivez l’étiquette d’identité bleue sur la fibre existante."
  ],
  [
    "Report at Device {0} · local port",
    "Rapport à l’équipement {0} · port local"
  ],
  [
    "Device {2}",
    "Équipement {2}"
  ],
  [
    "Port {3}",
    "Port {3}"
  ],
  [
    "LLDP neighbor",
    "Voisin LLDP"
  ],
  [
    "No LLDP message reported from the remote end. The light condition is still unknown.",
    "Aucun message LLDP signalé depuis l’extrémité distante. L’état lumineux reste inconnu."
  ],
  [
    "{0} is local. It hears {1} / {2} from the remote end of this link.",
    "{0} est local. Il reçoit {1} / {2} depuis l’extrémité distante de cette liaison."
  ],
  [
    "No device identity received",
    "Aucune identité d’équipement reçue"
  ],
  [
    "My port is {1}",
    "Mon port est {1}"
  ],
  [
    "No message to follow",
    "Aucun message à suivre"
  ],
  [
    "Remote {0} / {1} → {2} → local {3}.",
    "Distant {0} / {1} → {2} → local {3}."
  ],
  [
    "{0} sends its name and port through the same fiber to {1}.",
    "{0} envoie son nom et son port par la même fibre à {1}."
  ],
  [
    "Tab below · 25/1 is now right",
    "Languette en bas · 25/1 est à droite"
  ],
  [
    "Mapped MMC head → Port 28",
    "Tête MMC prévue → port 28"
  ],
  [
    "Flipped optic with purple tab below, so 25/1 is on the right. MMC head is mapped to CAS 2 Port 28.",
    "Optique retournée, languette violette en bas : 25/1 est à droite. La tête MMC est affectée à CAS 2 port 28."
  ],
  [
    "Read one complete patching ticket",
    "Lire une fiche complète de raccordement"
  ],
  [
    "Mock position",
    "Emplacement simulé"
  ],
  [
    "Leg 3",
    "Branche 3"
  ],
  [
    "Locate:",
    "Localiser :"
  ],
  [
    "building QNO5, room 5C, row 16 front, rack 17, elevation 30. The rack number is not the elevation.",
    "bâtiment QNO5, salle 5C, rangée 16 avant, baie 17, hauteur 30. Le numéro de baie n’est pas la hauteur."
  ],
  [
    "Orient:",
    "Orienter :"
  ],
  [
    "tab above gives /1 left and /5 right. Tab below swaps their physical sides, not their Ethernet identities.",
    "languette en haut : /1 à gauche et /5 à droite. Languette en bas : leurs côtés physiques s’inversent, pas leurs identités Ethernet."
  ],
  [
    "Map:",
    "Associer :"
  ],
  [
    "use leg 3 from the named head. Match CAS 2 / 28, on the 17–32 bottom row. A shared head serial does not make the legs interchangeable.",
    "utilisez la branche 3 de la tête nommée. Trouvez CAS 2 / 28, dans la rangée du bas 17–32. Un numéro de tête commun ne rend pas les branches interchangeables."
  ],
  [
    "Verify:",
    "Vérifier :"
  ],
  [
    "inspect / clean, seat the mapped connections and check health. Correct placement alone does not prove a working link.",
    "inspectez / nettoyez, enclenchez les connexions prévues et contrôlez l’état optique. Le placement correct seul ne prouve pas une liaison fonctionnelle."
  ],
  [
    "Direct loop passes",
    "Boucle directe réussie"
  ],
  [
    "TX returns to local RX. The external fiber and remote device are outside this test.",
    "TX revient à RX local. La fibre externe et l’équipement distant sont hors de ce test."
  ],
  [
    "CAS 1 loop passes",
    "Boucle CAS 1 réussie"
  ],
  [
    "The same pair now passes through the LC leg, MMC head and connections up to CAS 1. The onward route is still untested.",
    "La même paire traverse maintenant la branche LC, la tête MMC et les connexions jusqu’à CAS 1. Le chemin suivant reste non testé."
  ],
  [
    "CAS 2 loop fails",
    "Boucle CAS 2 en échec"
  ],
  [
    "Only the CAS 1 → CAS 2 section was added. Verify this loop setup, then investigate that section and its connections. The test does not identify the exact fault.",
    "Seule la section CAS 1 → CAS 2 a été ajoutée. Vérifiez ce montage de boucle, puis examinez cette section et ses connexions. Le test n’identifie pas le défaut exact."
  ],
  [
    "TX → loop → RX",
    "TX → boucle → RX"
  ],
  [
    "FOA · fiber testing",
    "FOA · tests fibre"
  ],
  [
    "FOA · dB and dBm",
    "FOA · dB et dBm"
  ],
  [
    "FOA · illustrated terms",
    "FOA · termes illustrés"
  ],
  [
    "Cisco · optic health",
    "Cisco · état optique"
  ],
  [
    "US Conec · MMC connectors",
    "US Conec · connecteurs MMC"
  ],
  [
    "Optical transceiver",
    "Émetteur-récepteur optique"
  ],
  [
    "Hardware",
    "Matériel"
  ],
  [
    "optical module",
    "module optique"
  ],
  [
    "A module in the device that converts electrical data into light and received light back into electrical data.",
    "Un module dans l’équipement qui convertit les données électriques en lumière et la lumière reçue en données électriques."
  ],
  [
    "Its TX sends; its RX receives. It lets the device communicate over fiber.",
    "Son TX émet ; son RX reçoit. Il permet à l’équipement de communiquer par fibre."
  ],
  [
    "The light-carrying strand",
    "La fibre qui transporte la lumière"
  ],
  [
    "fiber cable",
    "câble fibre"
  ],
  [
    "A thin glass path that carries light between connections.",
    "Un fin chemin de verre qui transporte la lumière entre les connexions."
  ],
  [
    "Trace the mapped strand through each connection; the cable itself does not generate light.",
    "Suivez la fibre prévue à travers chaque connexion ; le câble ne produit pas lui-même de lumière."
  ],
  [
    "Optic-side connector",
    "Connecteur côté optique"
  ],
  [
    "LC connector",
    "connecteur LC"
  ],
  [
    "duplex LC",
    "LC duplex"
  ],
  [
    "The small connector used at the optic in this course. Two LC connections form the illustrated TX/RX pair.",
    "Le petit connecteur utilisé à l’optique dans ce cours. Deux connexions LC forment la paire TX/RX illustrée."
  ],
  [
    "Match the assigned optic position and orientation. A duplex pair contains two fiber strands.",
    "Respectez la position et l’orientation prévues sur l’optique. Une paire duplex contient deux fibres."
  ],
  [
    "Multi-fiber connector",
    "Connecteur multifibre"
  ],
  [
    "A compact connector that brings several fiber paths together at one mating interface.",
    "Un connecteur compact qui réunit plusieurs chemins de fibre à une seule interface de contact."
  ],
  [
    "In our fanout examples, this is the head connected at the CAS. Its fibers stay separate; it does not split one signal.",
    "Dans nos exemples de fanout, c’est la tête raccordée au CAS. Ses fibres restent distinctes ; il ne divise pas un signal."
  ],
  [
    "CAS / cassette",
    "CAS / cassette"
  ],
  [
    "Site label · passive connection point",
    "Nom du site · point de connexion passif"
  ],
  [
    "The passive connection point shown in our fiber routes. It connects mapped fiber paths without making light.",
    "Le point de connexion passif de nos parcours. Il relie les chemins de fibre prévus sans produire de lumière."
  ],
  [
    "Our front view has ports 1–16 above 17–32. Match the actual CAS, port and route in the connection record.",
    "Notre vue de face montre les ports 1–16 au-dessus de 17–32. Respectez le CAS, le port et le chemin réels dans la fiche de connexion."
  ],
  [
    "One head, multiple followers",
    "Une tête, plusieurs branches"
  ],
  [
    "An assembly that brings separate follower paths into one multi-fiber head.",
    "Un ensemble qui réunit les chemins distincts des branches dans une tête multifibre."
  ],
  [
    "The example has 12 followers sharing a head serial. Count legs and individual strands separately; one duplex leg has two strands.",
    "L’exemple a 12 branches partageant un numéro de tête. Comptez séparément les branches et les fibres individuelles ; une branche duplex contient deux fibres."
  ],
  [
    "Follower / leg",
    "Branche du fanout"
  ],
  [
    "One branch of the fanout",
    "Une branche de l’ensemble"
  ],
  [
    "A labeled branch of the fanout that connects to its assigned optic position.",
    "Une branche étiquetée du fanout qui rejoint sa position optique attribuée."
  ],
  [
    "Match the leg ID as well as the head serial. Followers from the same head are not interchangeable.",
    "Vérifiez l’identifiant de branche et le numéro de tête. Les branches d’une même tête ne sont pas interchangeables."
  ],
  [
    "Ferrule",
    "Férule"
  ],
  [
    "Fiber holder at the connector face",
    "Support des fibres à la face du connecteur"
  ],
  [
    "connector face",
    "face du connecteur"
  ],
  [
    "end face",
    "face optique"
  ],
  [
    "The precision part that holds and aligns fibers where connectors meet.",
    "La pièce de précision qui maintient et aligne les fibres au contact des connecteurs."
  ],
  [
    "Dirt or damage here can affect a channel. The component is called a ferrule; its shape depends on the connector.",
    "Saleté ou dommage à cet endroit peuvent affecter un canal. Cette pièce s’appelle une férule ; sa forme dépend du connecteur."
  ],
  [
    "Transmit",
    "Émission"
  ],
  [
    "Light & readings",
    "Lumière et mesures"
  ],
  [
    "The optic’s sending side. It turns outgoing device data into light.",
    "Le côté émetteur de l’optique. Il transforme les données sortantes en lumière."
  ],
  [
    "Follow local TX through the mapped path to remote RX. A local TX reading does not prove that light arrived there.",
    "Suivez TX local sur le chemin prévu jusqu’à RX distant. Une mesure TX locale ne prouve pas que la lumière y est arrivée."
  ],
  [
    "Receive",
    "Réception"
  ],
  [
    "The optic’s receiving side. It detects incoming light and converts the signal back to electrical data.",
    "Le côté récepteur de l’optique. Il détecte la lumière entrante et reconvertit le signal en données électriques."
  ],
  [
    "Check each required lane against that optic’s lower and upper limits.",
    "Comparez chaque voie requise aux limites basse et haute de cette optique."
  ],
  [
    "Infrared light",
    "Lumière infrarouge"
  ],
  [
    "Light outside the visible range, used by the optics in our examples.",
    "Une lumière hors du spectre visible, utilisée par les optiques de nos exemples."
  ],
  [
    "Blue arrows in the course represent invisible IR. They are not a literal glow you can see on the cable.",
    "Les flèches bleues représentent l’IR invisible. Ce n’est pas une lueur réellement visible sur le câble."
  ],
  [
    "Optical power relative to 1 milliwatt",
    "Puissance optique relative à 1 milliwatt"
  ],
  [
    "A unit for optical power. Zero dBm equals 1 milliwatt; negative dBm still represents some power.",
    "Une unité de puissance optique. Zéro dBm équivaut à 1 milliwatt ; un dBm négatif représente encore de la puissance."
  ],
  [
    "Zero is not a universal “perfect” reading. Use the installed optic’s allowed range.",
    "Zéro n’est pas une mesure « parfaite » universelle. Utilisez la plage autorisée de l’optique installée."
  ],
  [
    "−40 / no light",
    "−40 / aucune lumière"
  ],
  [
    "Site report example",
    "Exemple de rapport du site"
  ],
  [
    "no light",
    "aucune lumière"
  ],
  [
    "In the report examples used here, −40 is the no-light indication.",
    "Dans les rapports d’exemple utilisés ici, −40 indique l’absence de lumière."
  ],
  [
    "It is a symptom, not the cause. Check the source, connections, mapped path and test setup before blaming a part.",
    "C’est un symptôme, pas la cause. Vérifiez la source, les connexions, le chemin prévu et le montage de test avant d’accuser une pièce."
  ],
  [
    "Attenuation",
    "Atténuation"
  ],
  [
    "Loss of optical power",
    "Perte de puissance optique"
  ],
  [
    "weak light",
    "lumière faible"
  ],
  [
    "bend loss",
    "perte par courbure"
  ],
  [
    "A reduction in light power as it travels through fiber and connections. Loss is expressed in dB.",
    "Une diminution de puissance lumineuse dans la fibre et les connexions. La perte s’exprime en dB."
  ],
  [
    "Too much loss can leave RX below its required minimum even when some light gets through.",
    "Une perte excessive peut laisser RX sous son minimum requis même si un peu de lumière passe."
  ],
  [
    "Correct TX-to-RX pairing",
    "Association correcte de TX à RX"
  ],
  [
    "Connections & tests",
    "Connexions et tests"
  ],
  [
    "swapped pair",
    "paire inversée"
  ],
  [
    "The fiber mapping that connects each transmitter to the intended receiver.",
    "L’affectation des fibres qui relie chaque émetteur au récepteur prévu."
  ],
  [
    "For the duplex example: A TX → B RX, and B TX → A RX. A swapped pair can break the link without turning the transmitter off.",
    "Pour l’exemple duplex : A TX → B RX, et B TX → A RX. Une paire inversée peut interrompre la liaison sans éteindre l’émetteur."
  ],
  [
    "Return TX light to RX",
    "Renvoyer la lumière TX vers RX"
  ],
  [
    "LC loop",
    "boucle LC"
  ],
  [
    "loop back",
    "boucle de retour"
  ],
  [
    "A test connection that routes transmitted light back to the intended receive path.",
    "Une connexion de test qui renvoie la lumière émise vers le chemin de réception prévu."
  ],
  [
    "A direct LC loop tests the optic. A loop farther along includes the fiber and connections to that point. Use the correct mapping and required attenuation.",
    "Une boucle LC directe teste l’optique. Une boucle plus loin inclut la fibre et les connexions jusqu’à ce point. Utilisez l’affectation correcte et l’atténuation requise."
  ],
  [
    "Visual fault locator",
    "Localisateur visuel de défauts"
  ],
  [
    "visual fault locator",
    "localisateur visuel de défauts"
  ],
  [
    "red light",
    "lumière rouge"
  ],
  [
    "A separate tool that puts visible red light into fiber for tracing.",
    "Un outil distinct qui injecte une lumière rouge visible dans la fibre pour la tracer."
  ],
  [
    "Use on fiber isolated from active equipment with the correct adapter. Observe safely from the side; never look into an illuminated end.",
    "Utilisez-le sur une fibre isolée des équipements actifs, avec l’adaptateur correct. Observez en sécurité de côté ; ne regardez jamais dans une extrémité éclairée."
  ],
  [
    "Continuity",
    "Continuité"
  ],
  [
    "An unbroken light path",
    "Un chemin lumineux ininterrompu"
  ],
  [
    "light passes",
    "la lumière passe"
  ],
  [
    "Light can travel through the tested strand from one point to another.",
    "La lumière peut traverser la fibre testée d’un point à un autre."
  ],
  [
    "Seeing VFL light at the expected endpoint helps confirm the route. It does not prove acceptable IR loss.",
    "Voir le VFL à l’extrémité attendue aide à confirmer le parcours. Cela ne prouve pas une perte IR acceptable."
  ],
  [
    "Misport",
    "Mauvais port"
  ],
  [
    "Connected to the wrong port",
    "Connecté au mauvais port"
  ],
  [
    "wrong port",
    "mauvais port"
  ],
  [
    "wrong destination",
    "mauvaise destination"
  ],
  [
    "A connection is seated in a different port from the one assigned in the record.",
    "Une connexion est enclenchée dans un port différent de celui attribué dans la fiche."
  ],
  [
    "Match the device, CAS and port labels. Light at an unexpected port is a reason to check the mapping.",
    "Vérifiez les étiquettes d’équipement, de CAS et de port. De la lumière à un port inattendu invite à vérifier l’affectation."
  ],
  [
    "Splice",
    "Épissure"
  ],
  [
    "A joint between fibers",
    "Une jonction entre fibres"
  ],
  [
    "A joint that joins two fiber ends into one path.",
    "Une jonction qui unit deux extrémités de fibre en un chemin."
  ],
  [
    "A poor joint can add loss or interrupt light. A dark reading alone cannot identify a splice as the cause.",
    "Une mauvaise jonction peut ajouter de la perte ou interrompre la lumière. L’absence de lumière seule n’identifie pas l’épissure comme cause."
  ],
  [
    "Local / remote",
    "Local / distant"
  ],
  [
    "Your end and the other end",
    "Votre extrémité et l’autre"
  ],
  [
    "Site & records",
    "Site et fiches"
  ],
  [
    "Local is the device you are working from. Remote is the device at the other end of the link.",
    "Local désigne l’équipement depuis lequel vous travaillez. Distant désigne celui à l’autre extrémité de la liaison."
  ],
  [
    "These names depend on your viewpoint. Each device has its own TX and RX.",
    "Ces noms dépendent du point de vue. Chaque équipement a ses propres TX et RX."
  ],
  [
    "Link Layer Discovery Protocol",
    "Link Layer Discovery Protocol"
  ],
  [
    "neighbor discovery",
    "découverte de voisins"
  ],
  [
    "local LLDP",
    "LLDP local"
  ],
  [
    "remote LLDP",
    "LLDP distant"
  ],
  [
    "A shared way for devices to announce their name and port over the existing link. Local is the device whose report you’re reading; remote is the other end.",
    "Un moyen commun pour les équipements d’annoncer leur nom et leur port sur la liaison existante. Local est l’équipement dont vous lisez le rapport ; distant est l’autre extrémité."
  ],
  [
    "LLDP lists the remote device as a neighbor. Passive cassettes between them do not become neighbors. Compare the reported name and port with FIM. LLDP adds no backup connection and does not prove optical health.",
    "LLDP indique l’équipement distant comme voisin. Les cassettes passives entre eux ne deviennent pas des voisins. Comparez le nom et le port signalés à FIM. LLDP n’ajoute pas de liaison de secours et ne prouve pas l’état optique."
  ],
  [
    "Cisco · LLDP neighbors",
    "Cisco · voisins LLDP"
  ],
  [
    "Site connection record",
    "Fiche de connexion du site"
  ],
  [
    "connection record",
    "fiche de connexion"
  ],
  [
    "The record used in this course to look up devices, ports, followers, heads and passive connections.",
    "La fiche utilisée dans ce cours pour retrouver équipements, ports, branches, têtes et connexions passives."
  ],
  [
    "Use it to confirm the expected path. The record tells you where a connection belongs; it is not a live light measurement.",
    "Utilisez-la pour confirmer le chemin attendu. Elle indique où doit aller une connexion ; ce n’est pas une mesure lumineuse en direct."
  ],
  [
    "Site optic-health report",
    "Rapport d’état optique du site"
  ],
  [
    "health report",
    "rapport d’état"
  ],
  [
    "optic health",
    "état optique"
  ],
  [
    "The system used in your site examples to view optic-health readings.",
    "Le système utilisé dans vos exemples pour consulter les mesures optiques."
  ],
  [
    "Read TX/RX per lane and the applicable limits. This learning site does not pull live reports from Cable Guy.",
    "Lisez TX/RX par voie et les limites applicables. Ce site pédagogique ne récupère pas de rapports Cable Guy en direct."
  ],
  [
    "Building → room → row → rack → elevation",
    "Bâtiment → salle → rangée → baie → hauteur"
  ],
  [
    "The site address used to locate the device within a building and rack.",
    "L’adresse du site qui permet de localiser l’équipement dans un bâtiment et une baie."
  ],
  [
    "QNO5.5C.16f.17.30 means building QNO5, room 5C, row 16 front, rack 17, elevation 30 in our example.",
    "QNO5.5C.16f.17.30 signifie bâtiment QNO5, salle 5C, rangée 16 avant, baie 17, hauteur 30 dans notre exemple."
  ],
  [
    "Simplified teaching view",
    "Vue pédagogique simplifiée"
  ],
  [
    "Two LC connections make one duplex pair.",
    "Deux connexions LC forment une paire duplex."
  ],
  [
    "Optic front view · purple tab above the ports",
    "Vue de face de l’optique · languette violette au-dessus des ports"
  ],
  [
    "Site layout · 1–16 above 17–32",
    "Disposition du site · 1–16 au-dessus de 17–32"
  ],
  [
    "The mating face holds aligned fibers.",
    "La face de contact maintient les fibres alignées."
  ],
  [
    "MMC head · side view",
    "Tête MMC · vue latérale"
  ],
  [
    "Direct LC loop · TX returns to RX",
    "Boucle LC directe · TX revient à RX"
  ],
  [
    "Three followers shown · separate paths into one head",
    "Trois branches représentées · chemins distincts vers une tête"
  ],
  [
    "Two directions · each TX connects to the other RX",
    "Deux sens · chaque TX rejoint l’autre RX"
  ],
  [
    "Blue / teal represents invisible infrared light.",
    "Le bleu / turquoise représente l’infrarouge invisible."
  ],
  [
    "At A: neighbor B · port 7/1",
    "À A : voisin B · port 7/1"
  ],
  [
    "Neighbor identity and port · not an optical power reading",
    "Identité et port du voisin · pas une mesure de puissance optique"
  ],
  [
    "RX · example report",
    "RX · rapport d’exemple"
  ],
  [
    "No-light indication in our site report example",
    "Indication d’absence de lumière dans notre rapport d’exemple"
  ],
  [
    "Compare the reading with the installed optic’s limits.",
    "Comparez la mesure aux limites de l’optique installée."
  ],
  [
    "Isolated fiber → expected strand",
    "Fibre isolée → fibre attendue"
  ],
  [
    "Visible red light · continuity is not a loss measurement",
    "Lumière rouge visible · la continuité ne mesure pas la perte"
  ],
  [
    "Device → Ethernet 25/1",
    "Équipement → Ethernet 25/1"
  ],
  [
    "Building / room / row / rack / height",
    "Bâtiment / salle / rangée / baie / hauteur"
  ],
  [
    "Leg 3 → named head → CAS 2 / 28",
    "Branche 3 → tête nommée → CAS 2 / 28"
  ],
  [
    "Site example · confirm the actual labels and record",
    "Exemple du site · confirmez les étiquettes et la fiche réelles"
  ],
  [
    "Port 13",
    "Port 13"
  ],
  [
    "Expected: 12",
    "Attendu : 12"
  ],
  [
    "Observed at 13 · check the mapping",
    "Observé à 13 · vérifier l’affectation"
  ],
  [
    "Power can decrease along the fiber and connections.",
    "La puissance peut diminuer le long de la fibre et des connexions."
  ],
  [
    "A splice joins two fiber ends.",
    "Une épissure relie deux extrémités de fibre."
  ],
  [
    "Light travels inside the fiber.",
    "La lumière voyage dans la fibre."
  ],
  [
    "Parts, terms & acronyms",
    "Composants, termes et acronymes"
  ],
  [
    "Close quick reference",
    "Fermer l’aide-mémoire"
  ],
  [
    "Close ×",
    "Fermer ×"
  ],
  [
    "Find a term",
    "Rechercher un terme"
  ],
  [
    "Try optic, TX, polarity or CAS",
    "Essayez optique, TX, polarité ou CAS"
  ],
  [
    "Show",
    "Afficher"
  ],
  [
    "All topics",
    "Tous les sujets"
  ],
  [
    "Why it matters:",
    "Pourquoi c’est utile :"
  ],
  [
    "See it in the lesson →",
    "Voir dans la leçon →"
  ],
  [
    "No matching terms. Try “optic”, “polarity” or “VFL”, or choose All topics.",
    "Aucun terme trouvé. Essayez « optique », « polarité » ou « VFL », ou choisissez Tous les sujets."
  ],
  [
    "{0}: definition",
    "{0} : définition"
  ],
  [
    "Counter unavailable",
    "Compteur indisponible"
  ],
  [
    "{0} min {1} sec combined",
    "{0} min {1} s cumulées"
  ],
  [
    "unique visitor",
    "visiteur unique"
  ],
  [
    "unique visitors",
    "visiteurs uniques"
  ],
  [
    "exam completed",
    "examen terminé"
  ],
  [
    "exams completed",
    "examens terminés"
  ],
  [
    "Shared counts are temporarily unavailable.",
    "Les compteurs partagés sont temporairement indisponibles."
  ],
  [
    "Course activity",
    "Activité du cours"
  ],
  [
    "learning hours",
    "heures d’apprentissage"
  ],
  [
    "Loading shared counts…",
    "Chargement des compteurs partagés…"
  ],
  [
    "Drop cancelled. Drop on a numbered port or inside the unplug area.",
    "Déplacement annulé. Déposez sur un port numéroté ou dans la zone de déconnexion."
  ],
  [
    "No fault",
    "Aucun défaut"
  ],
  [
    "Optic · TX not emitting",
    "Optique · TX n’émet pas"
  ],
  [
    "Optic · RX not receiving",
    "Optique · RX ne reçoit pas"
  ],
  [
    "Dirty connection",
    "Connexion sale"
  ],
  [
    "Loose connection",
    "Connexion mal enclenchée"
  ],
  [
    "Damaged MMC ferrule",
    "Férule MMC endommagée"
  ],
  [
    "Broken fiber",
    "Fibre cassée"
  ],
  [
    "Tight bend / pinch",
    "Courbure serrée / pincement"
  ],
  [
    "Polarity swapped",
    "Polarité inversée"
  ],
  [
    "Poor splice",
    "Mauvaise épissure"
  ],
  [
    "Pass",
    "Réussi"
  ],
  [
    "Weak return",
    "Retour faible"
  ],
  [
    "No return light",
    "Aucune lumière de retour"
  ],
  [
    "Different port",
    "Autre port"
  ],
  [
    "Other strand",
    "Autre fibre"
  ],
  [
    "No light seen",
    "Aucune lumière observée"
  ],
  [
    "Device + optic port",
    "Équipement + port optique"
  ],
  [
    "LC follower + MMC head",
    "Branche LC + tête MMC"
  ],
  [
    "CAS route + ports",
    "Parcours CAS + ports"
  ],
  [
    "Strand mapping",
    "Affectation des fibres"
  ],
  [
    "Reference has light",
    "La référence transmet"
  ],
  [
    "Reference also dark",
    "La référence est aussi sans lumière"
  ],
  [
    "Ends clean; original still dark",
    "Faces propres ; original toujours sans lumière"
  ],
  [
    "Damage seen",
    "Dommage observé"
  ],
  [
    "Cannot inspect",
    "Inspection impossible"
  ],
  [
    "Replacement has light",
    "Le remplacement transmet"
  ],
  [
    "Replacement also dark",
    "Le remplacement est aussi sans lumière"
  ],
  [
    "No compatible spare",
    "Aucune pièce compatible"
  ],
  [
    "Optic-side LC leg",
    "Branche LC côté optique"
  ],
  [
    "The setup is open at CAS {0}",
    "Le montage est ouvert à CAS {0}"
  ],
  [
    "the unplugged MMC head",
    "la tête MMC débranchée"
  ],
  [
    "the open cassette port",
    "le port de cassette ouvert"
  ],
  [
    "The illustrated path ends at {0} before your selected viewing point.",
    "Le chemin illustré s’arrête à {0}, avant votre point d’observation."
  ],
  [
    "Check for light at this opening, or reconnect it to continue tracing. This is a setup condition, not a diagnosed fiber fault.",
    "Cherchez la lumière à cette ouverture ou reconnectez-la pour continuer. C’est l’état du montage, pas un défaut de fibre diagnostiqué."
  ],
  [
    "Open a viewing point",
    "Ouvrir un point d’observation"
  ],
  [
    "Both sides of this cassette are connected. The fiber continues onward.",
    "Les deux côtés de cette cassette sont connectés. La fibre continue."
  ],
  [
    "Unplug the onward connector to check this port, or choose the next accessible cassette.",
    "Débranchez le connecteur suivant pour vérifier ce port, ou choisissez la cassette accessible suivante."
  ],
  [
    "Connections are still unplugged",
    "Des connexions restent débranchées"
  ],
  [
    "Removing the tool leaves the test connections open in the diagram. Earlier results are kept.",
    "Retirer l’outil laisse les connexions de test ouvertes dans le schéma. Les résultats précédents sont conservés."
  ],
  [
    "Select Normalize to reconnect the service path, then check actual readings and link status.",
    "Sélectionnez Normaliser pour reconnecter le chemin de service, puis vérifiez les mesures réelles et la liaison."
  ],
  [
    "Restored link is working",
    "La liaison normalisée fonctionne"
  ],
  [
    "You confirmed the required local readings and link status after removing the tools.",
    "Vous avez confirmé les mesures locales requises et la liaison après avoir retiré les outils."
  ],
  [
    "Record the work and readings. This does not identify the original cause or verify every other channel.",
    "Consignez le travail et les mesures. Cela n’identifie pas la cause initiale et ne vérifie pas tous les autres canaux."
  ],
  [
    "The restored link still needs checking",
    "La liaison normalisée reste à vérifier"
  ],
  [
    "Local tests do not prove end-to-end pairing or the remote source and receiver.",
    "Les tests locaux ne prouvent ni l’association de bout en bout ni la source et le récepteur distants."
  ],
  [
    "Verify FIM ports and TX-to-RX pairing. Trace accessible strands if needed; leave the onward path and remote device unverified.",
    "Vérifiez les ports FIM et l’association TX–RX. Tracez les fibres accessibles si nécessaire ; laissez le chemin suivant et l’équipement distant non vérifiés."
  ],
  [
    "Light reaches the loose MMC head",
    "La lumière atteint la tête MMC débranchée"
  ],
  [
    "You confirmed continuity up to this connector. The cassette connection has not been tested.",
    "Vous avez confirmé la continuité jusqu’à ce connecteur. La connexion de cassette n’a pas été testée."
  ],
  [
    "Plug the head into its mapped port, then check for light at the open opposite face.",
    "Branchez la tête dans son port prévu, puis cherchez la lumière à la face opposée ouverte."
  ],
  [
    "Check the port against FIM",
    "Vérifier le port par rapport à FIM"
  ],
  [
    "The diagram is patched to port {0}; the mapped destination is port {1}.",
    "Le schéma est raccordé au port {0} ; la destination prévue est le port {1}."
  ],
  [
    "Confirm the real patch and FIM record. Correct the connection if needed, then trace again.",
    "Confirmez le raccordement réel et la fiche FIM. Corrigez si nécessaire, puis tracez à nouveau."
  ],
  [
    "Light reached a different port",
    "La lumière a atteint un autre port"
  ],
  [
    "Light reached the other strand",
    "La lumière a atteint l’autre fibre"
  ],
  [
    "There is a route, but it does not match the expected port / TX–RX pairing.",
    "Un chemin existe, mais il ne correspond pas au port / à l’association TX–RX attendus."
  ],
  [
    "Check the FIM destination, leader / follower mapping and polarity. Correct the route, then trace again.",
    "Vérifiez la destination FIM, l’association tête / branche et la polarité. Corrigez le parcours, puis tracez à nouveau."
  ],
  [
    "Trace this section more closely",
    "Examiner cette section de plus près"
  ],
  [
    "No visible light at {0} does not identify a break or its exact position along {1}.",
    "L’absence de lumière visible à {0} n’identifie ni une cassure ni sa position exacte sur {1}."
  ],
  [
    "Choose an intermediate CAS to check a shorter route.",
    "Choisissez un CAS intermédiaire pour vérifier un parcours plus court."
  ],
  [
    "Verify the VFL and adapter. {0}Check nearby ports, seating, end faces, bends and damage; use a loss test / OTDR if needed.",
    "Vérifiez le VFL et l’adaptateur. {0}Vérifiez les ports voisins, l’enclenchement, les faces, les courbures et les dommages ; utilisez un test de perte / OTDR si nécessaire."
  ],
  [
    "This strand has visible continuity",
    "Cette fibre présente une continuité visible"
  ],
  [
    "Red light reached the expected destination. This does not prove acceptable IR loss or optic health.",
    "La lumière rouge a atteint la destination attendue. Cela ne prouve ni une perte IR acceptable ni l’état optique."
  ],
  [
    "Trace the other strand, then remove the VFL, restore the mapped path and recheck RX against the optic limits.",
    "Tracez l’autre fibre, retirez le VFL, normalisez le chemin prévu et revérifiez RX par rapport aux limites de l’optique."
  ],
  [
    "Start at the optic and test setup",
    "Commencer par l’optique et le montage"
  ],
  [
    "The direct loop did not pass. The external fiber path is bypassed.",
    "La boucle directe a échoué. Le chemin de fibre externe est contourné."
  ],
  [
    "Inspect → clean if needed → reinspect. Verify seating, loop mapping / attenuation and host status. Compare a known-good optic with the same valid test.",
    "Inspectez → nettoyez si nécessaire → réinspectez. Vérifiez l’enclenchement, l’affectation / l’atténuation de boucle et l’état de l’équipement. Comparez une optique de référence fonctionnelle avec le même test valide."
  ],
  [
    "Narrowed to {0} → {1}",
    "Zone réduite à {0} → {1}"
  ],
  [
    "Not isolated yet: loop at {0} failed",
    "Non isolé : boucle à {0} en échec"
  ],
  [
    "returned weak light",
    "a renvoyé une lumière faible"
  ],
  [
    "had no return light",
    "n’a renvoyé aucune lumière"
  ],
  [
    "The loop passed at {0} but {1} at {2}.",
    "La boucle a réussi à {0}, mais {1} à {2}."
  ],
  [
    "A failed passive loop includes the optic, fiber, connections and loop setup.",
    "Une boucle passive en échec inclut l’optique, la fibre, les connexions et le montage de boucle."
  ],
  [
    "Recheck the failed loop setup. Then loop at {0} to narrow this larger section before tracing.",
    "Revérifiez le montage en échec. Puis bouclez à {0} pour réduire cette grande section avant de tracer."
  ],
  [
    "Recheck the loop setup, then inspect the added section and its connections. Use VFL for routing / continuity; measure loss for attenuation.",
    "Revérifiez le montage, puis inspectez la section ajoutée et ses connexions. Utilisez le VFL pour le parcours / la continuité ; mesurez la perte pour l’atténuation."
  ],
  [
    "Try a valid LC loop directly at the optic to separate the optic / setup from the external path.",
    "Essayez une boucle LC valide directement sur l’optique pour séparer l’optique / le montage du chemin externe."
  ],
  [
    "Loop passed to {0}",
    "Boucle réussie jusqu’à {0}"
  ],
  [
    "The tested pair returned light within the limits you checked. This does not verify the live link, all MMC fibers or end-to-end polarity.",
    "La paire testée a renvoyé de la lumière dans les limites vérifiées. Cela ne valide ni la liaison en service, ni toutes les fibres MMC, ni la polarité de bout en bout."
  ],
  [
    "Move the loop to {0}. Compare the result with this passed test.",
    "Déplacez la boucle à {0}. Comparez le résultat à ce test réussi."
  ],
  [
    "Remove the loop and restore the mapped link. Recheck local health; leave the onward path and remote device unverified.",
    "Retirez la boucle et normalisez la liaison prévue. Revérifiez l’état local ; laissez le chemin suivant et l’équipement distant non vérifiés."
  ],
  [
    "Check why local TX is not emitting",
    "Vérifier pourquoi TX local n’émet pas"
  ],
  [
    "A reported −40 indicates no light / the reporting floor. A fiber polarity mismatch alone does not explain absent local TX output.",
    "−40 indique une absence de lumière / le plancher de mesure du rapport. Une erreur de polarité seule n’explique pas l’absence d’émission TX locale."
  ],
  [
    "Verify the report and lane, port / laser state and optic seating. Then use a supported loop or known-good comparison.",
    "Vérifiez le rapport et la voie, l’état du port / laser et l’enclenchement de l’optique. Utilisez ensuite une boucle compatible ou une comparaison de référence."
  ],
  [
    "Start with a direct optic loop",
    "Commencer par une boucle directe sur l’optique"
  ],
  [
    "A no-light reading tells you what is missing, not why. Test what you can reach.",
    "L’absence de lumière indique ce qui manque, pas pourquoi. Testez ce qui est accessible."
  ],
  [
    "Insert a supported LC loopback at the local optic. Check TX and the returning RX on the tested pair.",
    "Insérez une boucle LC compatible sur l’optique locale. Vérifiez TX et RX de retour sur la paire testée."
  ],
  [
    "· loose MMC head",
    "· tête MMC débranchée"
  ],
  [
    "· through CAS",
    "· à travers CAS"
  ],
  [
    "Check the VFL on a known-good reference using the same adapter / launch channel used for {0}. Does the reference pass light?",
    "Vérifiez le VFL sur une référence fonctionnelle avec le même adaptateur / canal d’injection utilisé pour {0}. La référence transmet-elle la lumière ?"
  ],
  [
    "The reference is also dark. Resolve the VFL, adapter, launch lead or coupling before blaming the installed fiber.",
    "La référence ne transmet pas non plus. Résolvez le problème de VFL, d’adaptateur, de cordon d’injection ou de couplage avant d’accuser la fibre installée."
  ],
  [
    "Confirm the device / optic socket, follower-to-head serial, CAS ports and expected channel in “Match the physical path”. A working strand can still belong to the wrong fanout.",
    "Confirmez l’équipement / logement optique, le numéro branche–tête, les ports CAS et le canal attendu dans « Vérifier le chemin physique ». Une fibre fonctionnelle peut appartenir au mauvais fanout."
  ],
  [
    "The VFL reference passes. The intended fiber identity still needs confirmation.",
    "La référence VFL transmet. L’identité de la fibre prévue reste à confirmer."
  ],
  [
    "Turn the VFL off and isolate from active gear. Inspect the mapped {0} fiber end faces with a compatible inspection probe. Clean and reinspect as needed; check seating and visible bends. Retest the original route before continuing.",
    "Éteignez le VFL et isolez des équipements actifs. Inspectez les faces de la fibre {0} prévue avec une sonde compatible. Nettoyez et réinspectez si nécessaire ; vérifiez l’enclenchement et les courbures visibles. Retestez le chemin initial avant de continuer."
  ],
  [
    "Reference and mapping checked. Inspect the individual fiber contacts, not just the outside of the MMC.",
    "Référence et affectation vérifiées. Inspectez les contacts individuels des fibres, pas seulement l’extérieur du MMC."
  ],
  [
    "Record which end / component shows damage. Replace or repair it using the approved procedure, then choose “Made a change · retest” and check both strands and optical readings.",
    "Notez l’extrémité / le composant endommagé. Remplacez ou réparez selon la procédure approuvée, puis choisissez « Changement effectué · retester » et vérifiez les deux fibres et les mesures optiques."
  ],
  [
    "Visible damage is a concrete finding. It may explain the dark strand; a post-repair test must confirm recovery.",
    "Un dommage visible est une constatation concrète. Il peut expliquer la fibre sans lumière ; un test après réparation doit confirmer le rétablissement."
  ],
  [
    "Compare one known-good compatible cable / fanout in place of the suspect assembly, keeping the same source, adapter and mapped {0} channel. Record the replacement result; the diagram still shows the original observations.",
    "Remplacez l’ensemble suspect par un câble / fanout compatible de référence, en conservant la source, l’adaptateur et le canal {0} prévu. Notez le résultat du remplacement ; le schéma montre toujours les observations initiales."
  ],
  [
    "Compare one known-good compatible mating lead / connection at CAS {0}, keeping the source and mapped {1} channel unchanged. Record the comparison separately from the original path.",
    "Comparez un cordon / raccord compatible de référence à CAS {0}, en conservant la source et le canal {1} prévu. Notez la comparaison séparément du chemin initial."
  ],
  [
    "Clean end faces did not restore continuity. Compare one component at a time.",
    "Les faces propres n’ont pas rétabli la continuité. Comparez un composant à la fois."
  ],
  [
    "End-face condition remains unknown. A compatible spare can still help narrow the assembly.",
    "L’état des faces reste inconnu. Une pièce compatible peut néanmoins aider à cibler l’ensemble."
  ],
  [
    "The original assembly or its mating contact is implicated. Record the replaced part; use end-face inspection and loss testing to separate connector / ferrule contact from an internal fiber fault. Retest both strands after the actual repair.",
    "L’ensemble initial ou son contact est mis en cause. Notez la pièce remplacée ; utilisez l’inspection des faces et le test de perte pour distinguer le contact du connecteur / de la férule d’un défaut interne de fibre. Retestez les deux fibres après réparation réelle."
  ],
  [
    "The compatible replacement passes where the original did not. This supports an assembly / connection problem; it does not prove a damaged ferrule.",
    "Le remplacement compatible transmet là où l’original échouait. Cela étaye un problème d’ensemble / de connexion ; cela ne prouve pas une férule endommagée."
  ],
  [
    "Both assemblies were dark in this setup. Recheck the common adapter / channel, source-side connection and mapping. The original assembly is not cleared. Use a loss test and, where suitable, OTDR to locate an unresolved fault.",
    "Les deux ensembles ne transmettaient pas dans ce montage. Revérifiez l’adaptateur / canal commun, la connexion côté source et l’affectation. L’ensemble initial n’est pas disculpé. Utilisez un test de perte et, si adapté, l’OTDR pour localiser le défaut non résolu."
  ],
  [
    "Replacing that assembly did not restore visible continuity. Investigate what stayed common to both tests.",
    "Le remplacement de cet ensemble n’a pas rétabli la continuité visible. Examinez ce qui est resté commun aux deux tests."
  ],
  [
    "Keep this strand and its connections suspect. Use an optical loss test to quantify loss and a suitable OTDR to locate events, or hand off these recorded checks to someone with access / equipment.",
    "Gardez cette fibre et ses connexions suspectes. Mesurez la perte optique et utilisez un OTDR adapté pour localiser les événements, ou transmettez ces contrôles consignés à quelqu’un ayant l’accès / le matériel."
  ],
  [
    "No compatible comparison is available. The evidence does not yet distinguish the termination, bend, break or splice.",
    "Aucune comparaison compatible disponible. Les indices ne distinguent pas encore terminaison, courbure, cassure ou épissure."
  ],
  [
    "Light at",
    "Lumière à"
  ],
  [
    "These channel results conflict",
    "Ces résultats de canaux se contredisent"
  ],
  [
    "Both input strands were recorded at the same output channel.",
    "Les deux fibres d’entrée ont été enregistrées sur le même canal de sortie."
  ],
  [
    "Confirm A / B labels and test one strand at a time. Recheck the same setup before changing polarity.",
    "Confirmez les repères A / B et testez une fibre à la fois. Revérifiez le même montage avant de changer la polarité."
  ],
  [
    "Recheck strand A",
    "Revérifier la fibre A"
  ],
  [
    "Separate outputs",
    "Sorties distinctes"
  ],
  [
    "Compare with the documented channel map.",
    "Comparez au plan des canaux documenté."
  ],
  [
    "Still the same output",
    "Toujours la même sortie"
  ],
  [
    "Verify labels, adapter and test setup.",
    "Vérifiez les étiquettes, l’adaptateur et le montage."
  ],
  [
    "The observed route does not match FIM",
    "Le parcours observé ne correspond pas à FIM"
  ],
  [
    "Patched port {0}; expected port {1}.",
    "Port raccordé {0} ; port attendu {1}."
  ],
  [
    "Light was reported at a different port.",
    "La lumière a été signalée à un autre port."
  ],
  [
    "Verify the device, LC follower, MMC serial and FIM destination. Correct the patch only after confirming the mapping, then start a retest.",
    "Vérifiez l’équipement, la branche LC, le numéro MMC et la destination FIM. Corrigez seulement après confirmation de l’affectation, puis retestez."
  ],
  [
    "Mapping matches",
    "L’affectation correspond"
  ],
  [
    "Recheck the strand and viewing point.",
    "Revérifiez la fibre et le point d’observation."
  ],
  [
    "Mapping differs",
    "L’affectation diffère"
  ],
  [
    "Correct the confirmed misport, then retest.",
    "Corrigez le mauvais port confirmé, puis retestez."
  ],
  [
    "The location results need a recheck",
    "Les résultats par emplacement sont à revérifier"
  ],
  [
    "Strand {0} was dark at {1} but seen farther along the same route.",
    "La fibre {0} était sans lumière à {1}, mais visible plus loin sur le même parcours."
  ],
  [
    "Confirm the source, strand and patching stayed the same. Recheck the dark point; these observations cannot yet isolate a fault.",
    "Confirmez que source, fibre et raccordement n’ont pas changé. Revérifiez le point sans lumière ; ces observations n’isolent pas encore un défaut."
  ],
  [
    "Recheck {0} · {1}",
    "Revérifier {0} · {1}"
  ],
  [
    "Strand {0}: check the MMC / CAS connection",
    "Fibre {0} : vérifier la connexion MMC / CAS"
  ],
  [
    "Both strands are dark here",
    "Les deux fibres sont sans lumière ici"
  ],
  [
    "Strand {0} is dark; the other has light",
    "La fibre {0} est sans lumière ; l’autre transmet"
  ],
  [
    "Strand {0}: no light recorded here",
    "Fibre {0} : aucune lumière consignée ici"
  ],
  [
    "Light reached the loose head, but was not seen through the cassette connection.",
    "La lumière atteignait la tête débranchée, mais n’était pas visible à travers la connexion de cassette."
  ],
  [
    "Last light: {0}. First dark check: {1}. The added section and connections need checking.",
    "Dernière lumière : {0}. Premier contrôle sans lumière : {1}. La section ajoutée et ses connexions sont à vérifier."
  ],
  [
    "This is a failed continuity observation. It does not identify which part is bad.",
    "C’est une observation de continuité en échec. Elle n’identifie pas la pièce défectueuse."
  ],
  [
    "Keep the VFL on {0}. Verify the VFL / adapter, then unplug the incoming MMC at CAS {1} and check its loose head.",
    "Gardez le VFL sur {0}. Vérifiez VFL / adaptateur, puis débranchez le MMC entrant à CAS {1} et vérifiez sa tête débranchée."
  ],
  [
    "{0} · {1} light seen",
    "{0} · {1} lumière observée"
  ],
  [
    "{0} · {1} dark",
    "{0} · {1} sans lumière"
  ],
  [
    "Check loose MMC · strand {0}",
    "Vérifier le MMC débranché · fibre {0}"
  ],
  [
    "Light at the head",
    "Lumière à la tête"
  ],
  [
    "Inspect seating, end faces and the CAS connection.",
    "Inspectez l’enclenchement, les faces et la connexion CAS."
  ],
  [
    "Head also dark",
    "Tête également sans lumière"
  ],
  [
    "Work back toward the source; check fiber and earlier connections.",
    "Remontez vers la source ; vérifiez la fibre et les connexions précédentes."
  ],
  [
    "Inspect both mating ends; clean and reinspect as needed. Verify seating and the mapped CAS port, then retest through the CAS.",
    "Inspectez les deux faces en contact ; nettoyez et réinspectez si nécessaire. Vérifiez l’enclenchement et le port CAS prévu, puis retestez à travers le CAS."
  ],
  [
    "MMC head · {0} light seen",
    "Tête MMC · {0} lumière observée"
  ],
  [
    "CAS {0} port · {1} dark",
    "Port CAS {0} · {1} sans lumière"
  ],
  [
    "Retest through CAS {0} · {1}",
    "Retester à travers CAS {0} · {1}"
  ],
  [
    "Light returns",
    "La lumière revient"
  ],
  [
    "Retest both strands, then verify optical readings.",
    "Retestez les deux fibres, puis vérifiez les mesures optiques."
  ],
  [
    "Still dark",
    "Toujours sans lumière"
  ],
  [
    "Compare a known-good compatible connection to isolate the failing part.",
    "Comparez une connexion compatible de référence pour isoler la pièce défectueuse."
  ],
  [
    "Check {0} · {1}",
    "Vérifier {0} · {1}"
  ],
  [
    "At the loose head, the receiving CAS {0} mating connection is bypassed. Check the incoming assembly and source-side connections.",
    "À la tête débranchée, la connexion réceptrice CAS {0} est contournée. Vérifiez l’ensemble entrant et les connexions côté source."
  ],
  [
    "The optic is disconnected from this VFL trace. Check the mapped fiber, its terminations and the source-side connection.",
    "L’optique est déconnectée de ce traçage VFL. Vérifiez la fibre prévue, ses terminaisons et la connexion côté source."
  ],
  [
    "Verify the source and mapped channel, inspect the individual fiber contacts, then compare one compatible assembly at a time. In a real case, record these checks in Find my problem.",
    "Vérifiez la source et le canal prévu, inspectez les contacts individuels, puis comparez un ensemble compatible à la fois. Dans un cas réel, consignez ces contrôles dans Trouver mon problème."
  ],
  [
    "The MMC ferrule aligns separate fibers. One passes light; {0} does not. That fiber, its end face or contact can fail independently. Verify mapping and the test setup before identifying a faulty part.",
    "La férule MMC aligne des fibres distinctes. L’une transmet ; {0} ne transmet pas. Cette fibre, sa face ou son contact peuvent échouer indépendamment. Vérifiez l’affectation et le montage avant d’identifier une pièce défectueuse."
  ],
  [
    "Keep the source and strand unchanged. Check {0} to shorten the suspect section.",
    "Gardez la source et la fibre inchangées. Vérifiez {0} pour raccourcir la section suspecte."
  ],
  [
    "Earlier point has light",
    "Le point précédent reçoit de la lumière"
  ],
  [
    "Investigate the section added after that point.",
    "Examinez la section ajoutée après ce point."
  ],
  [
    "Earlier point is dark",
    "Le point précédent est sans lumière"
  ],
  [
    "Move toward the source and verify the VFL setup.",
    "Remontez vers la source et vérifiez le montage VFL."
  ],
  [
    "Check the documented strand mapping",
    "Vérifier l’affectation documentée des fibres"
  ],
  [
    "Light is present, but at the other illustrated channel.",
    "La lumière est présente, mais sur l’autre canal illustré."
  ],
  [
    "Compare both strands with the FIM / cable channel map. A / B are illustration labels; do not swap fibers solely because this picture differs.",
    "Comparez les deux fibres au plan FIM / du câble. A / B sont des repères illustratifs ; ne les inversez pas seulement parce que ce dessin diffère."
  ],
  [
    "Check the other strand",
    "Vérifier l’autre fibre"
  ],
  [
    "Matches the channel map",
    "Correspond au plan des canaux"
  ],
  [
    "Verify TX reaches the intended RX.",
    "Vérifiez que TX atteint RX prévu."
  ],
  [
    "Does not match",
    "Ne correspond pas"
  ],
  [
    "Correct the verified pairing, then retest.",
    "Corrigez l’association vérifiée, puis retestez."
  ],
  [
    "Strand {0} has light; check the other strand",
    "La fibre {0} transmet ; vérifiez l’autre"
  ],
  [
    "One recorded strand does not prove the pair is continuous. Visible light does not prove acceptable IR loss or optic health.",
    "Une fibre consignée ne prouve pas la continuité de la paire. La lumière visible ne prouve ni une perte IR acceptable ni l’état optique."
  ],
  [
    "Keep the same source and viewing point. Move the VFL to the other strand and record what you see.",
    "Gardez la même source et le même point d’observation. Déplacez le VFL sur l’autre fibre et notez ce que vous voyez."
  ],
  [
    "Other strand has light",
    "L’autre fibre transmet"
  ],
  [
    "Both have visible continuity at this point.",
    "Les deux présentent une continuité visible ici."
  ],
  [
    "Other strand is dark",
    "L’autre fibre est sans lumière"
  ],
  [
    "Separate the incoming head from the CAS connection.",
    "Séparez la tête entrante de la connexion CAS."
  ],
  [
    "Both strands reach the loose MMC head",
    "Les deux fibres atteignent la tête MMC débranchée"
  ],
  [
    "Both strands have visible continuity here",
    "Les deux fibres présentent une continuité visible ici"
  ],
  [
    "The cassette connection has not yet been checked.",
    "La connexion de cassette n’a pas encore été vérifiée."
  ],
  [
    "This does not prove acceptable IR loss, optic health or the remote link.",
    "Cela ne prouve ni une perte IR acceptable, ni l’état optique, ni la liaison distante."
  ],
  [
    "Seat the head in its mapped port, then check through the cassette.",
    "Enclenchez la tête dans son port prévu, puis vérifiez à travers la cassette."
  ],
  [
    "Continue to the next accessible point and check both strands.",
    "Continuez au point accessible suivant et vérifiez les deux fibres."
  ],
  [
    "Normalize the path, then verify the required optical readings and link status.",
    "Normalisez le chemin, puis vérifiez les mesures optiques requises et la liaison."
  ],
  [
    "Check through the CAS",
    "Vérifier à travers le CAS"
  ],
  [
    "Continue to {0}",
    "Continuer vers {0}"
  ],
  [
    "Loop at {0}: {1}. VFL continuity does not clear this optical test.",
    "Boucle à {0} : {1}. La continuité VFL ne valide pas ce test optique."
  ],
  [
    "Visible light does not clear the failed loop",
    "La lumière visible ne valide pas la boucle en échec"
  ],
  [
    "Verify the loop setup and inspect the connections. Recheck the loop against the optic limits; measure loss if the return remains weak.",
    "Vérifiez le montage de boucle et inspectez les connexions. Recontrôlez la boucle selon les limites de l’optique ; mesurez la perte si le retour reste faible."
  ],
  [
    "Loop passes",
    "La boucle réussit"
  ],
  [
    "Restore the mapped path and verify the live link.",
    "Normalisez le chemin prévu et vérifiez la liaison en service."
  ],
  [
    "Loop still fails",
    "La boucle échoue toujours"
  ],
  [
    "Continue isolating the optic / setup or added fiber section.",
    "Continuez à isoler l’optique / le montage ou la section de fibre ajoutée."
  ],
  [
    "Starting local TX reports no light. The VFL has its own source and does not verify the optic.",
    "TX local initial signale aucune lumière. Le VFL a sa propre source et ne vérifie pas l’optique."
  ],
  [
    "Next loop passes",
    "La boucle suivante réussit"
  ],
  [
    "Compare with the next accessible point.",
    "Comparez au point accessible suivant."
  ],
  [
    "Next loop fails",
    "La boucle suivante échoue"
  ],
  [
    "Verify its setup; investigate the section added since the last pass.",
    "Vérifiez son montage ; examinez la section ajoutée depuis la dernière réussite."
  ],
  [
    "Known-good setup passes",
    "Le montage de référence réussit"
  ],
  [
    "Compare the original optic / loop setup one change at a time.",
    "Comparez l’optique / le montage initial un changement à la fois."
  ],
  [
    "Still fails",
    "Échoue toujours"
  ],
  [
    "Check the optic, host state and test compatibility before tracing fiber.",
    "Vérifiez l’optique, l’état de l’équipement et la compatibilité du test avant de tracer la fibre."
  ],
  [
    "Unresolved finding: {0}.",
    "Constat non résolu : {0}."
  ],
  [
    "Unresolved loop: {0} · {1}.",
    "Boucle non résolue : {0} · {1}."
  ],
  [
    "The restored link still has a problem. These recorded findings remain unresolved.",
    "La liaison normalisée présente encore un problème. Ces constats consignés restent non résolus."
  ],
  [
    "Link verified",
    "Liaison vérifiée"
  ],
  [
    "Retest · earlier checks kept",
    "Nouveau test · contrôles précédents conservés"
  ],
  [
    "Issue found · keep isolating",
    "Problème observé · continuer à isoler"
  ],
  [
    "Checks recorded · link unverified",
    "Contrôles consignés · liaison non vérifiée"
  ],
  [
    "Case active · waiting for a result",
    "Cas actif · en attente de résultat"
  ],
  [
    "Ready · place a tool to begin",
    "Prêt · placez un outil pour commencer"
  ],
  [
    "MMC loopback",
    "Boucle MMC"
  ],
  [
    "Drop cancelled. Any placed tool stays where it was.",
    "Déplacement annulé. L’outil déjà placé reste à sa position."
  ],
  [
    "Tool selection cancelled.",
    "Sélection d’outil annulée."
  ],
  [
    "VFL attached to the unplugged LC leg. Drag to move or remove.",
    "VFL connecté à la branche LC débranchée. Faites glisser pour déplacer ou retirer."
  ],
  [
    "front view",
    "vue de face"
  ],
  [
    "{0} view",
    "vue {0}"
  ],
  [
    "Loose MMC head",
    "Tête MMC débranchée"
  ],
  [
    "Incoming MMC {0}; {1} port {2}",
    "MMC entrant {0} ; {1} port {2}"
  ],
  [
    "Head unplugged",
    "Tête débranchée"
  ],
  [
    "Remote · unverified",
    "Distant · non vérifié"
  ],
  [
    "Loop here: {0}",
    "Boucle ici : {0}"
  ],
  [
    "Recorded mismatch · check connection",
    "Écart consigné · vérifier la connexion"
  ],
  [
    "✓ Tested optic pair passed",
    "✓ Paire optique testée réussie"
  ],
  [
    "✓ Loop passed to here",
    "✓ Boucle réussie jusqu’ici"
  ],
  [
    "at LC",
    "au LC"
  ],
  [
    "to head",
    "jusqu’à la tête"
  ],
  [
    "Not tested yet",
    "Pas encore testé"
  ],
  [
    "Investigate",
    "À examiner"
  ],
  [
    "Loop + VFL passed",
    "Boucle + VFL réussis"
  ],
  [
    "Loop passed",
    "Boucle réussie"
  ],
  [
    "VFL continuity",
    "Continuité VFL"
  ],
  [
    "{0} to CAS {1}, {2}",
    "{0} à CAS {1}, {2}"
  ],
  [
    "Recorded loop coverage: local TX through CAS {0}. Onward path unverified.",
    "Couverture de boucle consignée : TX local à travers CAS {0}. Chemin suivant non vérifié."
  ],
  [
    "Check light at",
    "Observer la lumière à"
  ],
  [
    "Select",
    "Sélectionner"
  ],
  [
    "optic-side LC leg",
    "branche LC côté optique"
  ],
  [
    ", port {0}",
    ", port {0}"
  ],
  [
    "Remote device",
    "Équipement distant"
  ],
  [
    "CAS {0} · Port {1}",
    "CAS {0} · port {1}"
  ],
  [
    "Drag this loop to move it, or return it to the tray",
    "Faites glisser cette boucle pour la déplacer ou la remettre au plateau"
  ],
  [
    "MMC head unplugged · CAS bypassed",
    "Tête MMC débranchée · CAS contourné"
  ],
  [
    "Both sides patched · path continues",
    "Deux côtés raccordés · le chemin continue"
  ],
  [
    "Rear",
    "Arrière"
  ],
  [
    "{0} port open · incoming MMC seated",
    "Port {0} ouvert · MMC entrant enclenché"
  ],
  [
    "Loop inserted · service fiber unplugged",
    "Boucle insérée · fibre de service débranchée"
  ],
  [
    "VFL on LC leg · optic empty",
    "VFL sur branche LC · optique vide"
  ],
  [
    "VFL on unplugged fiber",
    "VFL sur fibre débranchée"
  ],
  [
    "LC legs unplugged · optic empty",
    "Branches LC débranchées · optique vide"
  ],
  [
    "MMC unplugged · path open",
    "MMC débranché · chemin ouvert"
  ],
  [
    "LC legs plugged into optic",
    "Branches LC branchées à l’optique"
  ],
  [
    "MMC head plugged into CAS",
    "Tête MMC branchée au CAS"
  ],
  [
    "VFL source",
    "Source VFL"
  ],
  [
    "Light seen here",
    "Lumière observée ici"
  ],
  [
    "Light at another port",
    "Lumière à un autre port"
  ],
  [
    "Light on other strand",
    "Lumière sur l’autre fibre"
  ],
  [
    "No light seen here",
    "Aucune lumière observée ici"
  ],
  [
    "Expect light here",
    "Lumière attendue ici"
  ],
  [
    "Outside your reach",
    "Hors de votre portée"
  ],
  [
    "Enter your loop result",
    "Saisissez le résultat de boucle"
  ],
  [
    "Loop connected · result not entered",
    "Boucle connectée · résultat non saisi"
  ],
  [
    "Beyond loop: bypassed",
    "Au-delà de la boucle : contourné"
  ],
  [
    "Drag the VFL to move it, or return it to the tray",
    "Faites glisser le VFL pour le déplacer ou le remettre au plateau"
  ],
  [
    "Open connection · check here first",
    "Connexion ouverte · vérifier ici d’abord"
  ],
  [
    "Patched onward · open a viewing point",
    "Raccordé à la suite · ouvrir un point d’observation"
  ],
  [
    "Light at loose MMC head",
    "Lumière à la tête MMC débranchée"
  ],
  [
    "Light at patched port {0}",
    "Lumière au port raccordé {0}"
  ],
  [
    "Follow this route · light not yet confirmed",
    "Suivre ce parcours · lumière non confirmée"
  ],
  [
    "Connectors unplugged · Normalize",
    "Connecteurs débranchés · Normaliser"
  ],
  [
    "Simulated service path · fault position is illustrative",
    "Chemin de service simulé · position du défaut illustrative"
  ],
  [
    "Recorded coverage · live link not implied",
    "Couverture consignée · liaison en service non déduite"
  ],
  [
    "Light arrives; RX fails",
    "La lumière arrive ; RX échoue"
  ],
  [
    "LC leg → MMC head",
    "Branche LC → tête MMC"
  ],
  [
    "at optic",
    "à l’optique"
  ],
  [
    "in this section",
    "dans cette section"
  ],
  [
    "Simulated fault {2} ↓",
    "Défaut simulé {2} ↓"
  ],
  [
    "Interactive fiber path. TX sends along one strand; RX receives along the other. Choose a local optic or accessible cassette.",
    "Chemin de fibre interactif. TX émet sur une fibre ; RX reçoit sur l’autre. Choisissez une optique locale ou une cassette accessible."
  ],
  [
    "VFL on fiber",
    "VFL sur fibre"
  ],
  [
    "Drag a placed tool back here to remove.",
    "Ramenez un outil placé ici pour le retirer."
  ],
  [
    "Find the problem",
    "Trouver le problème"
  ],
  [
    "Start with what you can reach. No fault selection needed.",
    "Commencez par ce qui est accessible. Aucun défaut à sélectionner."
  ],
  [
    "SIMULATION",
    "SIMULATION"
  ],
  [
    "Hypothetical results · no live measurements",
    "Résultats hypothétiques · aucune mesure en direct"
  ],
  [
    "Light present",
    "Lumière présente"
  ],
  [
    "Weak",
    "Faible"
  ],
  [
    "Local TX",
    "TX local"
  ],
  [
    "Local RX",
    "RX local"
  ],
  [
    "Remote RX",
    "RX distant"
  ],
  [
    "Expected with service path restored:",
    "Attendu avec le chemin de service normalisé :"
  ],
  [
    "Remote shown for simulation only.",
    "Distant représenté uniquement pour la simulation."
  ],
  [
    "Normalize",
    "Normaliser"
  ],
  [
    "Reconnect the service path",
    "Reconnecter le chemin de service"
  ],
  [
    "The tool is off. The highlighted LC legs or MMC heads are still unplugged.",
    "L’outil est retiré. Les branches LC ou têtes MMC surlignées restent débranchées."
  ],
  [
    "Reconnects the illustration and keeps recorded tests. Confirm the real connections before checking health.",
    "Reconnecte l’illustration et conserve les tests. Confirmez les connexions réelles avant de vérifier l’état optique."
  ],
  [
    "Check the restored link",
    "Vérifier la liaison normalisée"
  ],
  [
    "Choose the next test",
    "Choisir le prochain test"
  ],
  [
    "Place your first test",
    "Placer votre premier test"
  ],
  [
    "Yes · link working",
    "Oui · liaison fonctionnelle"
  ],
  [
    "No · still a problem",
    "Non · problème persistant"
  ],
  [
    "Remove test tools, confirm the real mapped connections, then check required local readings and link status. Is the link working now?",
    "Retirez les outils de test, confirmez les connexions réelles prévues, puis vérifiez les mesures locales requises et la liaison. Fonctionne-t-elle maintenant ?"
  ],
  [
    "Place a tool for your next check. Earlier observations stay on the path and in Case history.",
    "Placez un outil pour le prochain contrôle. Les observations précédentes restent sur le chemin et dans l’historique du cas."
  ],
  [
    "Drag LC onto the optic to start. If you already have a test set up, place that tool at its matching point.",
    "Glissez LC sur l’optique pour commencer. Si un test est déjà monté, placez cet outil au point correspondant."
  ],
  [
    "Yes · passes",
    "Oui · réussi"
  ],
  [
    "No · no return light",
    "Non · aucun retour lumineux"
  ],
  [
    "Light returns, but weak",
    "La lumière revient, mais faible"
  ],
  [
    "Does the loop pass?",
    "La boucle réussit-elle ?"
  ],
  [
    "What did you see at {0}?",
    "Qu’avez-vous observé à {0} ?"
  ],
  [
    "Remove tool",
    "Retirer l’outil"
  ],
  [
    "CAS {0} source port",
    "Port source CAS {0}"
  ],
  [
    "CAS {0} {1} port",
    "Port {1} de CAS {0}"
  ],
  [
    "Use the correct loop mapping and required attenuation. Check TX and returning RX against this optic’s limits.",
    "Utilisez l’affectation correcte de boucle et l’atténuation requise. Comparez TX et RX de retour aux limites de cette optique."
  ],
  [
    "The optic-side LC leg is unplugged; the optic itself is not part of this trace.",
    "La branche LC côté optique est débranchée ; l’optique ne fait pas partie de ce traçage."
  ],
  [
    "The VFL supplies red light at {0}. Check the isolated fiber end at {1}. {2}",
    "Le VFL fournit la lumière rouge à {0}. Vérifiez l’extrémité isolée à {1}. {2}"
  ],
  [
    "Strand to trace",
    "Fibre à tracer"
  ],
  [
    "Normally local TX → remote RX",
    "Normalement TX local → RX distant"
  ],
  [
    "Normally remote TX → local RX",
    "Normalement TX distant → RX local"
  ],
  [
    "Practice only · results come from the chosen fault.",
    "Entraînement seulement · résultats issus du défaut choisi."
  ],
  [
    "I’ve disconnected this test section from the optics and fitted the matching VFL adapter.",
    "J’ai déconnecté cette section des optiques et installé l’adaptateur VFL adapté."
  ],
  [
    "Run this test",
    "Exécuter ce test"
  ],
  [
    "Simulated",
    "Simulé"
  ],
  [
    "You recorded",
    "Vous avez consigné"
  ],
  [
    "Placing the tool does not record a pass.",
    "Placer l’outil ne consigne pas une réussite."
  ],
  [
    "Practice ·",
    "Entraînement ·"
  ],
  [
    "Set up",
    "Préparer"
  ],
  [
    "Test",
    "Tester"
  ],
  [
    "Isolate",
    "Isoler"
  ],
  [
    "Verify",
    "Vérifier"
  ],
  [
    "Case progress",
    "Progression du cas"
  ],
  [
    "{2} current {3} · Round {4}",
    "{2} {3} actuel(s) · série {4}"
  ],
  [
    "Ready for your first result",
    "Prêt pour votre premier résultat"
  ],
  [
    "Compare TX and returning RX with the optic’s limits.",
    "Comparez TX et RX de retour aux limites de l’optique."
  ],
  [
    "The red glow illustrates the expected path. Record what you actually see on the selected strand.",
    "La lueur rouge illustre le chemin attendu. Notez ce que vous voyez réellement sur la fibre sélectionnée."
  ],
  [
    "Next: {0} loop at {1}",
    "Suite : boucle {0} à {1}"
  ],
  [
    "Trace {0} with VFL",
    "Tracer {0} au VFL"
  ],
  [
    "Simulated findings",
    "Constats simulés"
  ],
  [
    "Case findings",
    "Constats du cas"
  ],
  [
    "VFL on {1}",
    "VFL sur {1}"
  ],
  [
    "Recorded strand comparison",
    "Comparaison des fibres consignée"
  ],
  [
    "Section to investigate",
    "Section à examiner"
  ],
  [
    "What this adds",
    "Ce que cela apporte"
  ],
  [
    "Verified by your confirmation",
    "Vérifié par votre confirmation"
  ],
  [
    "Next check",
    "Prochain contrôle"
  ],
  [
    "How the next result guides you",
    "Comment le prochain résultat vous guide"
  ],
  [
    "Current setup: waiting for a new result. Earlier findings stay visible.",
    "Montage actuel : en attente d’un nouveau résultat. Les constats précédents restent visibles."
  ],
  [
    "{0} other recorded {1} remain in this case.",
    "{0} autre(s) {1} consigné(s) reste(nt) dans ce cas."
  ],
  [
    "Untested strands, onward fiber and the remote device remain unverified.",
    "Les fibres non testées, la fibre suivante et l’équipement distant restent non vérifiés."
  ],
  [
    "Identity · {0}",
    "Identité · {0}"
  ],
  [
    "VFL reference",
    "Référence VFL"
  ],
  [
    "End-face inspection",
    "Inspection des faces"
  ],
  [
    "Compatible replacement",
    "Remplacement compatible"
  ],
  [
    "· port {0}",
    "· port {0}"
  ],
  [
    "Loop · {0}{1}",
    "Boucle · {0}{1}"
  ],
  [
    "· loose head",
    "· tête débranchée"
  ],
  [
    "VFL {0} → {1}{2}{3} · strand {4}",
    "VFL {0} → {1}{2}{3} · fibre {4}"
  ],
  [
    "Confirmed by you",
    "Confirmé par vous"
  ],
  [
    "Needs confirmation",
    "À confirmer"
  ],
  [
    "Light at {0}",
    "Lumière à {0}"
  ],
  [
    "Earlier",
    "Précédent"
  ],
  [
    "{1} · round {2}",
    "{1} · série {2}"
  ],
  [
    "Case",
    "Cas"
  ],
  [
    "Undo",
    "Annuler"
  ],
  [
    "Made a change · retest",
    "Changement effectué · retester"
  ],
  [
    "Copy findings",
    "Copier les constats"
  ],
  [
    "New case",
    "Nouveau cas"
  ],
  [
    "No tests recorded. Place a tool, then enter the result you observed.",
    "Aucun test consigné. Placez un outil, puis saisissez le résultat observé."
  ],
  [
    "Recorded tests",
    "Tests consignés"
  ],
  [
    "{0} history",
    "Historique {0}"
  ],
  [
    "Saved in this browser tab · up to 100 checks. Retest keeps earlier checks and starts fresh findings.",
    "Enregistré dans cet onglet · jusqu’à 100 contrôles. Retester conserve les contrôles précédents et commence de nouveaux constats."
  ],
  [
    "Record result",
    "Consigner le résultat"
  ],
  [
    "See findings",
    "Voir les constats"
  ],
  [
    "VFL · check {0}",
    "VFL · vérifier {0}"
  ],
  [
    "loop placed",
    "boucle placée"
  ],
  [
    "Choose a test, then record what you find",
    "Choisissez un test, puis consignez vos observations"
  ],
  [
    "View path",
    "Voir le chemin"
  ],
  [
    "Current test actions",
    "Actions du test actuel"
  ],
  [
    "View a point on the path",
    "Voir un point du chemin"
  ],
  [
    "Connections unplugged · service path open",
    "Connexions débranchées · chemin de service ouvert"
  ],
  [
    "Normalized · recorded test coverage",
    "Normalisé · couverture des tests consignés"
  ],
  [
    "waiting for your result",
    "en attente de votre résultat"
  ],
  [
    "Loop at {0} · {1}",
    "Boucle à {0} · {1}"
  ],
  [
    "Play arrows",
    "Animer les flèches"
  ],
  [
    "Pause arrows",
    "Arrêter les flèches"
  ],
  [
    "Blue / teal: loop checked",
    "Bleu / turquoise : boucle vérifiée"
  ],
  [
    "Red: VFL continuity recorded",
    "Rouge : continuité VFL consignée"
  ],
  [
    "Amber: investigate · dashed: untested",
    "Ambre : à examiner · pointillés : non testé"
  ],
  [
    "A = TX strand · B = RX strand · one pair shown",
    "A = fibre TX · B = fibre RX · une paire représentée"
  ],
  [
    "Blue / teal: invisible IR",
    "Bleu / turquoise : IR invisible"
  ],
  [
    "Red: VFL",
    "Rouge : VFL"
  ],
  [
    "Dashed: unverified / bypassed",
    "Pointillés : non vérifié / contourné"
  ],
  [
    "Visual test path",
    "Chemin de test visuel"
  ],
  [
    "Your test path",
    "Votre chemin de test"
  ],
  [
    "Fiber diagram; scroll horizontally to see the full path",
    "Schéma fibre ; faites défiler horizontalement pour voir tout le chemin"
  ],
  [
    "↔ Scroll to follow the path",
    "↔ Faites défiler pour suivre le chemin"
  ],
  [
    "Path identity updated. Optical observations are unchanged.",
    "Identité du chemin mise à jour. Observations optiques inchangées."
  ],
  [
    "Path updated. Earlier checks kept in history; current findings cleared.",
    "Chemin mis à jour. Contrôles précédents conservés dans l’historique ; constats actuels effacés."
  ],
  [
    "Trace route updated. Confirm this setup before recording a result.",
    "Parcours de traçage mis à jour. Confirmez ce montage avant de consigner un résultat."
  ],
  [
    "The VFL starts here. Choose a different point to check for light.",
    "Le VFL commence ici. Choisissez un autre point pour observer la lumière."
  ],
  [
    "Viewing point changed. Confirm the setup, then record what you see.",
    "Point d’observation modifié. Confirmez le montage, puis notez ce que vous voyez."
  ],
  [
    "To move a tool, drag its handle or select it from the tray.",
    "Pour déplacer un outil, glissez sa poignée ou sélectionnez-le dans le plateau."
  ],
  [
    "Place this loop on its matching hardware.",
    "Placez cette boucle sur le matériel correspondant."
  ],
  [
    "This fiber section accepts a VFL. Place the loop on its matching hardware.",
    "Cette section accepte un VFL. Placez la boucle sur le matériel correspondant."
  ],
  [
    "Comparison recorded for this route and strand.",
    "Comparaison consignée pour ce parcours et cette fibre."
  ],
  [
    "Check the open end here, then enter your observation.",
    "Vérifiez l’extrémité ouverte ici, puis saisissez votre observation."
  ],
  [
    "Onward connection seated. Check the next opening.",
    "Connexion suivante enclenchée. Vérifiez la prochaine ouverture."
  ],
  [
    "VFL direction reversed. Confirm the new setup before recording a result.",
    "Sens VFL inversé. Confirmez le nouveau montage avant de consigner un résultat."
  ],
  [
    "SIMULATED FIBER CASE",
    "CAS FIBRE SIMULÉ"
  ],
  [
    "FIBER OBSERVATIONS — entered manually",
    "OBSERVATIONS FIBRE — saisies manuellement"
  ],
  [
    "Reach: {0}; {1} passives on path",
    "Accès : {0} ; {1} passifs sur le chemin"
  ],
  [
    "Mapped ports: {0}",
    "Ports prévus : {0}"
  ],
  [
    "Within optic limits",
    "Dans les limites de l’optique"
  ],
  [
    "Starting local TX: {0}; RX: {1}",
    "TX local initial : {0} ; RX : {1}"
  ],
  [
    "Fault: {0}; section {1}",
    "Défaut : {0} ; section {1}"
  ],
  [
    "Case: {0}; round {1}",
    "Cas : {0} ; série {1}"
  ],
  [
    "confirmed by technician",
    "confirmé par le technicien"
  ],
  [
    "not confirmed",
    "non confirmé"
  ],
  [
    "IDENTITY: {0} — {1}",
    "IDENTITÉ : {0} — {1}"
  ],
  [
    "CURRENT: {0} — {1}",
    "ACTUEL : {0} — {1}"
  ],
  [
    "Diagram CAS {0}: port {1}; rear {2}, front {3}",
    "Schéma CAS {0} : port {1} ; arrière {2}, avant {3}"
  ],
  [
    "Required local readings and link normal",
    "Mesures locales requises et liaison normales"
  ],
  [
    "Still has a problem",
    "Problème persistant"
  ],
  [
    "Restored link: {0}",
    "Liaison normalisée : {0}"
  ],
  [
    "EARLIER round {0}: {1} — {2}",
    "Série PRÉCÉDENTE {0} : {1} — {2}"
  ],
  [
    "Remote and untested lanes remain unverified.",
    "L’équipement distant et les voies non testées restent non vérifiés."
  ],
  [
    "Copied",
    "Copié"
  ],
  [
    "Findings to copy",
    "Constats à copier"
  ],
  [
    "Retest started. Earlier checks kept; enter fresh results after your change.",
    "Nouveau test commencé. Contrôles précédents conservés ; saisissez de nouveaux résultats après votre changement."
  ],
  [
    "Simulated test recorded.",
    "Test simulé consigné."
  ],
  [
    "Restored link observation recorded.",
    "Observation de la liaison normalisée consignée."
  ],
  [
    "Observation recorded.",
    "Observation consignée."
  ],
  [
    "Next check set up in the diagram. Match the real setup, then record your result.",
    "Prochain contrôle préparé dans le schéma. Reproduisez le montage réel, puis consignez votre résultat."
  ],
  [
    "The connections changed. Set up this recorded test again before rechecking.",
    "Les connexions ont changé. Reconstituez ce test consigné avant de revérifier."
  ],
  [
    "LC legs unplugged",
    "Branches LC débranchées"
  ],
  [
    "Test fiber at CAS {0}",
    "Fibre de test à CAS {0}"
  ],
  [
    "Loose LC legs",
    "Branches LC libres"
  ],
  [
    "VFL supplies the light",
    "Le VFL fournit la lumière"
  ],
  [
    "Strand",
    "Fibre"
  ],
  [
    "Move VFL to {1} {2}",
    "Déplacer le VFL vers {1} {2}"
  ],
  [
    "Unplug",
    "Débrancher"
  ],
  [
    "Plug in",
    "Brancher"
  ],
  [
    "MMC plugged in",
    "MMC branché"
  ],
  [
    "MMC unplugged",
    "MMC débranché"
  ],
  [
    "Plug MMC into CAS {1} port {2}",
    "Brancher le MMC à CAS {1} port {2}"
  ],
  [
    "Light continues onward →",
    "La lumière continue →"
  ],
  [
    "No light reported here",
    "Aucune lumière signalée ici"
  ],
  [
    "Light reported at a different port",
    "Lumière signalée à un autre port"
  ],
  [
    "Shown",
    "Affiché"
  ],
  [
    "{0} at {1} · {2}",
    "{0} à {1} · {2}"
  ],
  [
    "the LC end",
    "l’extrémité LC"
  ],
  [
    "VFL light from {2} to {3}",
    "Lumière VFL de {2} à {3}"
  ],
  [
    "Your checks · CAS {0} · from {1}",
    "Vos contrôles · CAS {0} · depuis {1}"
  ],
  [
    "VFL on",
    "VFL sur"
  ],
  [
    "Loose MMC",
    "MMC débranché"
  ],
  [
    "Through CAS",
    "À travers CAS"
  ],
  [
    "loose MMC head at CAS {0}",
    "tête MMC débranchée à CAS {0}"
  ],
  [
    "loose LC end",
    "extrémité LC libre"
  ],
  [
    "Expected path · no result recorded",
    "Chemin attendu · aucun résultat consigné"
  ],
  [
    "Simulated fault · illustration",
    "Défaut simulé · illustration"
  ],
  [
    "Your recorded observation",
    "Votre observation consignée"
  ],
  [
    "Same channel",
    "Même canal"
  ],
  [
    "Other channel",
    "Autre canal"
  ],
  [
    "From",
    "Depuis"
  ],
  [
    "Check at",
    "Vérifier à"
  ],
  [
    "Patched port",
    "Port raccordé"
  ],
  [
    "FIM destination: CAS {0} · Port {1}",
    "Destination FIM : CAS {0} · port {1}"
  ],
  [
    "Normally TX",
    "Normalement TX"
  ],
  [
    "Normally RX",
    "Normalement RX"
  ],
  [
    "Trace this strand",
    "Tracer cette fibre"
  ],
  [
    "Path: {0}",
    "Chemin : {0}"
  ],
  [
    "Unplug MMC",
    "Débrancher MMC"
  ],
  [
    "Plug MMC in",
    "Brancher MMC"
  ],
  [
    "Connect onward → {0}",
    "Raccorder la suite → {0}"
  ],
  [
    "Light exits at the open connection at CAS {0}, before your selected destination.",
    "La lumière sort à la connexion ouverte de CAS {0}, avant votre destination sélectionnée."
  ],
  [
    "Save the simulated check",
    "Enregistrer le contrôle simulé"
  ],
  [
    "What do you see at the {0}?",
    "Que voyez-vous à {0} ?"
  ],
  [
    "Unplug the onward connection to check this port.",
    "Débranchez la connexion suivante pour vérifier ce port."
  ],
  [
    "Unplug onward MMC",
    "Débrancher le MMC suivant"
  ],
  [
    "Record this check",
    "Consigner ce contrôle"
  ],
  [
    "Light at A",
    "Lumière à A"
  ],
  [
    "Light at B",
    "Lumière à B"
  ],
  [
    "Record the real observation to get your next check. The initial glow is only an illustration.",
    "Consignez l’observation réelle pour obtenir le prochain contrôle. La lueur initiale n’est qu’une illustration."
  ],
  [
    "VFL strand check",
    "Contrôle de fibre au VFL"
  ],
  [
    "Follow the red light",
    "Suivre la lumière rouge"
  ],
  [
    "Tap an LC leg. Plug or unplug the MMC.",
    "Touchez une branche LC. Branchez ou débranchez le MMC."
  ],
  [
    "Choose VFL strand",
    "Choisir la fibre VFL"
  ],
  [
    "Learn polarity: see TX / RX and trace both strands →",
    "Apprendre la polarité : voir TX / RX et tracer les deux fibres →"
  ],
  [
    "A / B illustrate one pair, not MMC pin numbers. Follow your actual channel map. Use isolated fiber and the matching VFL adapter; view light indirectly.",
    "A / B illustrent une paire, pas les numéros de broches MMC. Suivez votre plan réel des canaux. Utilisez une fibre isolée et l’adaptateur VFL adapté ; observez la lumière indirectement."
  ],
  [
    "Device locations & links | Fiber Optics Fundamentals",
    "Emplacements et liaisons | Fondamentaux de la fibre optique"
  ],
  [
    "Fiber Optics Fundamentals",
    "Fondamentaux de la fibre optique"
  ],
  [
    "Learn the connections. Practice the patching. Troubleshoot the path.",
    "Comprendre les connexions. S’exercer au raccordement. Dépanner le chemin."
  ],
  [
    "← Back to your check",
    "← Retour à votre contrôle"
  ],
  [
    "Enable JavaScript to view the illustrated chapter.",
    "Activez JavaScript pour voir le chapitre illustré."
  ],
  [
    "Never look into an optic or fiber end. Follow your site’s approved procedures.",
    "Ne regardez jamais dans une optique ou une extrémité de fibre. Suivez les procédures approuvées du site."
  ],
  [
    "Created by",
    "Créé par"
  ],
  [
    "Troubleshoot | Fiber Optics Fundamentals",
    "Dépanner | Fondamentaux de la fibre optique"
  ],
  [
    "Place a tool. Record the result. Find the next check.",
    "Placez un outil. Consignez le résultat. Trouvez le prochain contrôle."
  ],
  [
    "Troubleshooting mode",
    "Mode de dépannage"
  ],
  [
    "Find my problem",
    "Trouver mon problème"
  ],
  [
    "Practice a known fault",
    "Simuler un défaut connu"
  ],
  [
    "Guided check",
    "Contrôle guidé"
  ],
  [
    "Guided yes or no check",
    "Contrôle guidé oui ou non"
  ],
  [
    "Starting loop location",
    "Point de boucle initial"
  ],
  [
    "LC at the optic",
    "LC à l’optique"
  ],
  [
    "MMC at the passive",
    "MMC au passif"
  ],
  [
    "Troubleshooting controls",
    "Commandes de dépannage"
  ],
  [
    "Step 1",
    "Étape 1"
  ],
  [
    "Restart",
    "Recommencer"
  ],
  [
    "Your troubleshooting path",
    "Votre parcours de dépannage"
  ],
  [
    "Enable JavaScript to use this diagram.",
    "Activez JavaScript pour utiliser ce schéma."
  ],
  [
    "Never look into a fiber. Use site-approved tests. Answer only after a valid test.",
    "Ne regardez jamais dans une fibre. Utilisez les tests approuvés du site. Répondez seulement après un test valide."
  ],
  [
    "Cisco · optical TX/RX",
    "Cisco · TX/RX optiques"
  ],
  [
    "Fluke · VFL & loss testing",
    "Fluke · VFL et tests de perte"
  ],
  [
    "US Conec · MMC ferrules",
    "US Conec · férules MMC"
  ],
  [
    "Learn | Fiber Optics Fundamentals",
    "Apprendre | Fondamentaux de la fibre optique"
  ],
  [
    "Enable JavaScript to view the illustrated course.",
    "Activez JavaScript pour voir le cours illustré."
  ],
  [
    "FIM, LC & MMC patching | Fiber Optics Fundamentals",
    "FIM, raccordement LC et MMC | Fondamentaux de la fibre optique"
  ],
  [
    "Exams | Fiber Optics Fundamentals",
    "Examens | Fondamentaux de la fibre optique"
  ],
  [
    "← Back to learning",
    "← Retour aux leçons"
  ],
  [
    "Enable JavaScript to take an exam.",
    "Activez JavaScript pour passer un examen."
  ],
  [
    "Learning references:",
    "Références pédagogiques :"
  ],
  [
    "Cisco: optic power & connections",
    "Cisco : puissance optique et connexions"
  ],
  [
    "Fluke: tracing & testing",
    "Fluke : traçage et tests"
  ],
  [
    "Simulations | Fiber Optics Fundamentals",
    "Simulations | Fondamentaux de la fibre optique"
  ],
  [
    "Enable JavaScript to use the interactive simulations.",
    "Activez JavaScript pour utiliser les simulations interactives."
  ],
  [
    "direct",
    "direct"
  ],
  [
    "passive",
    "passif"
  ],
  [
    "fiber",
    "fibre"
  ],
  [
    "seen",
    "observé"
  ],
  [
    "misport",
    "mauvais port"
  ],
  [
    "setup",
    "montage"
  ],
  [
    "missing",
    "manquant"
  ],
  [
    "confirmed",
    "confirmé"
  ],
  [
    "unconfirmed",
    "non confirmé"
  ],
  [
    "on",
    "activé"
  ],
  [
    "lit",
    "éclairé"
  ],
  [
    "red",
    "rouge"
  ],
  [
    "good",
    "bon"
  ],
  [
    "dark",
    "sans lumière"
  ],
  [
    "yes",
    "oui"
  ],
  [
    "outcome",
    "résultat"
  ],
  [
    "success",
    "réussite"
  ],
  [
    "instruction",
    "instruction"
  ],
  [
    "decision",
    "décision"
  ],
  [
    "compare",
    "comparer"
  ],
  [
    "reconnect",
    "reconnecter"
  ],
  [
    "recheck",
    "revérifier"
  ],
  [
    "branches",
    "branches"
  ],
  [
    "no",
    "non"
  ],
  [
    "start",
    "début"
  ],
  [
    "device",
    "équipement"
  ],
  [
    "distribution",
    "distribution"
  ],
  [
    "passage",
    "passage"
  ],
  [
    "send",
    "émettre"
  ],
  [
    "receive",
    "recevoir"
  ],
  [
    "data",
    "données"
  ],
  [
    "optics",
    "optiques"
  ],
  [
    "path",
    "chemin"
  ],
  [
    "readings",
    "mesures"
  ],
  [
    "cleaning",
    "nettoyage"
  ],
  [
    "devices",
    "équipements"
  ],
  [
    "position",
    "position"
  ],
  [
    "ends",
    "extrémités"
  ],
  [
    "viewpoint",
    "point de vue"
  ],
  [
    "ports",
    "ports"
  ],
  [
    "patching",
    "raccordement"
  ],
  [
    "course",
    "cours"
  ],
  [
    "location",
    "emplacement"
  ],
  [
    "download",
    "télécharger"
  ],
  [
    "pass",
    "réussi"
  ],
  [
    "fail",
    "échec"
  ],
  [
    "clean",
    "propre"
  ],
  [
    "isolate",
    "isoler"
  ],
  [
    "done",
    "terminé"
  ],
  [
    "loss",
    "perte"
  ],
  [
    "unknown",
    "inconnu"
  ],
  [
    "simulations",
    "simulations"
  ],
  [
    "group",
    "groupe"
  ],
  [
    "label",
    "étiquette"
  ],
  [
    "select",
    "sélectionner"
  ],
  [
    "option",
    "option"
  ],
  [
    "change",
    "changement"
  ],
  [
    "right",
    "droite"
  ],
  [
    "left",
    "gauche"
  ],
  [
    "return",
    "retour"
  ],
  [
    "seated",
    "enclenché"
  ],
  [
    "held",
    "maintenu"
  ],
  [
    "moving",
    "en mouvement"
  ],
  [
    "gap",
    "espace"
  ],
  [
    "side",
    "côté"
  ],
  [
    "below",
    "en bas"
  ],
  [
    "above",
    "en haut"
  ],
  [
    "exam",
    "examen"
  ],
  [
    "quiz",
    "quiz"
  ],
  [
    "practice",
    "entraînement"
  ],
  [
    "progress",
    "progression"
  ],
  [
    "selected",
    "sélectionné"
  ],
  [
    "center",
    "centre"
  ],
  [
    "service",
    "service"
  ],
  [
    "intermediate",
    "intermédiaire"
  ],
  [
    "beginner",
    "débutant"
  ],
  [
    "connections",
    "connexions"
  ],
  [
    "dirty",
    "sale"
  ],
  [
    "bend",
    "courbure"
  ],
  [
    "optic",
    "optique"
  ],
  [
    "directions",
    "sens"
  ],
  [
    "healthy",
    "fonctionnel"
  ],
  [
    "weak",
    "faible"
  ],
  [
    "lanes",
    "voies"
  ],
  [
    "sections",
    "sections"
  ],
  [
    "gear",
    "matériel"
  ],
  [
    "purpose",
    "rôle"
  ],
  [
    "patch",
    "raccordement"
  ],
  [
    "question",
    "question"
  ],
  [
    "questions",
    "questions"
  ],
  [
    "rear",
    "arrière"
  ],
  [
    "front",
    "avant"
  ],
  [
    "receives",
    "réception"
  ],
  [
    "sends",
    "émission"
  ],
  [
    "and",
    "et"
  ],
  [
    "match",
    "correspond"
  ],
  [
    "different",
    "différent"
  ],
  [
    "port",
    "port"
  ],
  [
    "remote",
    "distant"
  ],
  [
    "transceiver",
    "émetteur-récepteur"
  ],
  [
    "strand",
    "fibre"
  ],
  [
    "leader",
    "tête"
  ],
  [
    "head",
    "tête"
  ],
  [
    "passives",
    "passifs"
  ],
  [
    "assembly",
    "ensemble"
  ],
  [
    "breakout",
    "épanouissement"
  ],
  [
    "follower",
    "branche"
  ],
  [
    "followers",
    "branches"
  ],
  [
    "leg",
    "branche"
  ],
  [
    "legs",
    "branches"
  ],
  [
    "ferrule",
    "férule"
  ],
  [
    "ferrite",
    "ferrite"
  ],
  [
    "transmit",
    "émettre"
  ],
  [
    "transmitter",
    "émetteur"
  ],
  [
    "sending",
    "émission"
  ],
  [
    "receiver",
    "récepteur"
  ],
  [
    "receiving",
    "réception"
  ],
  [
    "infrared",
    "infrarouge"
  ],
  [
    "power",
    "puissance"
  ],
  [
    "reading",
    "mesure"
  ],
  [
    "attenuation",
    "atténuation"
  ],
  [
    "polarity",
    "polarité"
  ],
  [
    "pairing",
    "association"
  ],
  [
    "swap",
    "inversion"
  ],
  [
    "loop",
    "boucle"
  ],
  [
    "trace",
    "traçage"
  ],
  [
    "continuity",
    "continuité"
  ],
  [
    "continuous",
    "continu"
  ],
  [
    "splice",
    "épissure"
  ],
  [
    "joint",
    "jonction"
  ],
  [
    "splicing",
    "épissurage"
  ],
  [
    "endpoint",
    "extrémité"
  ],
  [
    "neighbor",
    "voisin"
  ],
  [
    "neighbour",
    "voisin"
  ],
  [
    "ticket",
    "fiche"
  ],
  [
    "mapping",
    "affectation"
  ],
  [
    "elevation",
    "hauteur"
  ],
  [
    "term",
    "terme"
  ],
  [
    "terms",
    "termes"
  ],
  [
    "open",
    "ouvrir"
  ],
  [
    "close",
    "fermer"
  ],
  [
    "time",
    "temps"
  ],
  [
    "visitor",
    "visiteur"
  ],
  [
    "link",
    "liaison"
  ],
  [
    "break",
    "cassure"
  ],
  [
    "both",
    "les deux"
  ],
  [
    "loose",
    "mal enclenché"
  ],
  [
    "unplugged",
    "débranché"
  ],
  [
    "plugged",
    "branché"
  ],
  [
    "none",
    "aucun"
  ],
  [
    "swapped",
    "inversé"
  ],
  [
    "wrong",
    "incorrect"
  ],
  [
    "identity",
    "identité"
  ],
  [
    "unchecked",
    "non vérifié"
  ],
  [
    "comparison",
    "comparaison"
  ],
  [
    "place",
    "placer"
  ],
  [
    "remove",
    "retirer"
  ],
  [
    "normalize",
    "normaliser"
  ],
  [
    "tool",
    "outil"
  ],
  [
    "bad",
    "défectueux"
  ],
  [
    "ready",
    "prêt"
  ],
  [
    "health",
    "état optique"
  ],
  [
    "count",
    "compteur"
  ],
  [
    "reach",
    "accès"
  ],
  [
    "fault",
    "défaut"
  ],
  [
    "record",
    "consigner"
  ],
  [
    "retest",
    "retester"
  ],
  [
    "clear",
    "effacer"
  ],
  [
    "suspect",
    "suspect"
  ],
  [
    "source",
    "source"
  ],
  [
    "substitute",
    "remplacement"
  ],
  [
    "inspection",
    "inspection"
  ],
  [
    "damage",
    "dommage"
  ],
  [
    "light",
    "lumière"
  ],
  [
    "issue",
    "problème"
  ],
  [
    "simulation",
    "simulation"
  ],
  [
    "observation",
    "observation"
  ],
  [
    "expected",
    "attendu"
  ],
  [
    "through",
    "à travers"
  ],
  [
    "actual",
    "réel"
  ],
  [
    "Weak / out of limits",
    "Faible / hors limites"
  ],
  [
    "A clear example path. Test results still cover only the pair and section tested.",
    "Un chemin d’exemple sans défaut. Les résultats ne couvrent que la paire et la section testées."
  ],
  [
    "The local source is not emitting in this example. VFL uses its own light source.",
    "La source locale n’émet pas dans cet exemple. Le VFL utilise sa propre source lumineuse."
  ],
  [
    "The receiver fails in this example even though local TX still emits.",
    "Le récepteur échoue dans cet exemple, même si TX local émet toujours."
  ],
  [
    "Contamination can reduce or block light at an optic face, LC, MMC or passive connection.",
    "La contamination peut réduire ou bloquer la lumière à une face optique, un LC, un MMC ou une connexion passive."
  ],
  [
    "An incompletely seated connector can interrupt the selected strand or pair.",
    "Un connecteur mal enclenché peut interrompre la fibre ou la paire sélectionnée."
  ],
  [
    "The MMC ferrule holds and aligns fibers. Damage can affect one or several channels.",
    "La férule MMC maintient et aligne les fibres. Un dommage peut affecter un ou plusieurs canaux."
  ],
  [
    "One selected strand is interrupted. A dark test alone does not locate a real break.",
    "Une fibre sélectionnée est interrompue. Un test sans lumière seul ne localise pas une cassure réelle."
  ],
  [
    "A tight bend or pinch can add loss, even when the jacket looks intact.",
    "Une courbure serrée ou un pincement peut ajouter de la perte, même si la gaine paraît intacte."
  ],
  [
    "The selected strand reaches a different port than the one on the connection record.",
    "La fibre sélectionnée atteint un autre port que celui de la fiche de connexion."
  ],
  [
    "The pair is swapped here. A loop can pass, yet the restored link can still land TX on TX.",
    "La paire est inversée ici. Une boucle peut réussir alors que la liaison normalisée relie encore TX à TX."
  ],
  [
    "A poor splice can add loss or interrupt the selected strand.",
    "Une mauvaise épissure peut ajouter de la perte ou interrompre la fibre sélectionnée."
  ],
  [
    "guided",
    "guidé"
  ],
  [
    "drop on the optic.",
    "déposez sur l’optique."
  ],
  [
    "drop on a reachable CAS.",
    "déposez sur un CAS accessible."
  ],
  [
    "drop at the LC leg or CAS where the VFL starts, then choose where to check for light.",
    "déposez à la branche LC ou au CAS où commence le VFL, puis choisissez où observer la lumière."
  ],
  [
    "{0}: {1} You can also tap the target.",
    "{0} : {1} Vous pouvez aussi toucher la cible."
  ],
  [
    "Drag a tool onto the path, or tap a tool then its target.",
    "Glissez un outil sur le chemin, ou touchez l’outil puis sa cible."
  ],
  [
    "That tool does not match this point. Choose a highlighted target.",
    "Cet outil ne correspond pas à ce point. Choisissez une cible surlignée."
  ],
  [
    "VFL placed. Choose its source and where you expect light, then enter your observation.",
    "VFL placé. Choisissez sa source et où vous attendez la lumière, puis saisissez votre observation."
  ],
  [
    "{0} placed. Enter the result you observed.",
    "Outil en place : {0}. Saisissez le résultat observé."
  ],
  [
    "Tool removed; connectors left unplugged. Results kept.",
    "Outil retiré ; connecteurs laissés débranchés. Résultats conservés."
  ],
  [
    "Setup normalized. Your recorded coverage stays on the path.",
    "Montage normalisé. Votre couverture consignée reste sur le chemin."
  ],
  [
    "connected",
    "connecté"
  ],
  [
    "CAS {0}: {1} {2}. Recheck the affected section.",
    "CAS {0} : {1} {2}. Revérifiez la section concernée."
  ],
  [
    "Remove VFL",
    "Retirer le VFL"
  ],
  [
    "Test tools",
    "Outils de test"
  ],
  [
    "At the optic",
    "À l’optique"
  ],
  [
    "At a cassette",
    "À une cassette"
  ],
  [
    "LC leg / fiber",
    "Branche LC / fibre"
  ],
  [
    "Pick up {2}",
    "Prendre {2}"
  ],
  [
    "Enter result ↓",
    "Saisir le résultat ↓"
  ],
  [
    "Passives on path",
    "Passifs sur le chemin"
  ],
  [
    "I can reach",
    "Je peux accéder à"
  ],
  [
    "Optic only",
    "Optique seulement"
  ],
  [
    "Edit path · {0} CAS",
    "Modifier le chemin · {0} CAS"
  ],
  [
    "Starting local TX",
    "TX local initial"
  ],
  [
    "Starting local RX",
    "RX local initial"
  ],
  [
    "Your path settings",
    "Réglages de votre chemin"
  ],
  [
    "Enter your observations. Nothing is connected to Cable Guy or live equipment. A −40 report tells us no light was reported, not the cause.",
    "Saisissez vos observations. Rien n’est connecté à Cable Guy ni au matériel réel. Un rapport −40 indique qu’aucune lumière n’a été signalée, pas la cause."
  ],
  [
    "Optic face / LC socket",
    "Face optique / logement LC"
  ],
  [
    "Beyond CAS {0} → remote",
    "Au-delà de CAS {0} → distant"
  ],
  [
    "Choose a fault",
    "Choisir un défaut"
  ],
  [
    "Where?",
    "Où ?"
  ],
  [
    "Affected strand",
    "Fibre affectée"
  ],
  [
    "Local TX → remote RX",
    "TX local → RX distant"
  ],
  [
    "Remote TX → local RX",
    "TX distant → RX local"
  ],
  [
    "Both strands",
    "Les deux fibres"
  ],
  [
    "Example effect",
    "Effet d’exemple"
  ],
  [
    "Blocks light",
    "Bloque la lumière"
  ],
  [
    "Adds loss · weak light",
    "Ajoute de la perte · lumière faible"
  ],
  [
    "Simulation setup",
    "Montage de simulation"
  ],
  [
    "{5} Effects are simplified; real results depend on the hardware, mapping and wavelength.",
    "{5} Les effets sont simplifiés ; les résultats réels dépendent du matériel, de l’affectation et de la longueur d’onde."
  ],
  [
    "Ethernet ID + physical socket, e.g. 25/1 vs 25/5",
    "Identifiant Ethernet + logement physique, ex. 25/1 ou 25/5"
  ],
  [
    "Follower number + head serial match the record",
    "Numéro de branche + numéro de tête conformes à la fiche"
  ],
  [
    "Accessible CAS faces and ports match FIM",
    "Faces et ports CAS accessibles conformes à FIM"
  ],
  [
    "Expected fiber / channel at both test ends",
    "Fibre / canal attendus aux deux extrémités du test"
  ],
  [
    "Identity checked by you for this round. This is separate from optical health.",
    "Identité vérifiée par vous pour cette série. Cela est distinct de l’état optique."
  ],
  [
    "A pass belongs to the hardware tested. Confirm it is the intended path.",
    "Une réussite concerne le matériel testé. Confirmez qu’il s’agit du chemin prévu."
  ],
  [
    "checked",
    "vérifié"
  ],
  [
    "Match the physical path",
    "Vérifier le chemin physique"
  ],
  [
    "{0}/4 confirmed",
    "{0}/4 confirmés"
  ],
  [
    "Record the comparison result",
    "Consigner le résultat de comparaison"
  ],
  [
    "Confirm path identity",
    "Confirmer l’identité du chemin"
  ],
  [
    "Method references:",
    "Références de méthode :"
  ],
  [
    "Fiber testing",
    "Tests fibre"
  ],
  [
    "Inspection",
    "Inspection"
  ],
  [
    ". Guidance combines these principles with your observations.",
    ". Les conseils combinent ces principes et vos observations."
  ],
  [
    "mapped",
    "prévu"
  ],
  [
    "run",
    "essai"
  ],
  [
    "check",
    "contrôle"
  ],
  [
    "checks",
    "contrôles"
  ],
  [
    "active",
    "actif"
  ],
  [
    "recorded",
    "consigné"
  ],
  [
    "untested",
    "non testé"
  ],
  [
    "next",
    "suivant"
  ],
  [
    "issues",
    "problèmes"
  ],
  [
    "current",
    "actuel"
  ],
  [
    "earlier",
    "précédent"
  ],
  [
    "undo",
    "annuler"
  ],
  [
    "copy",
    "copier"
  ],
  [
    "reset",
    "réinitialiser"
  ],
  [
    "findings",
    "constats"
  ],
  [
    "motion",
    "animation"
  ],
  [
    "point",
    "point"
  ],
  [
    "Remove placed tool",
    "Retirer l’outil placé"
  ],
  [
    "{0} term",
    "{0} terme"
  ],
  [
    "{0} terms",
    "{0} termes"
  ],
  [
    "↳ {0}",
    "↳ {0}"
  ],
  [
    "Next: {0}",
    "Suite : {0}"
  ],
  [
    "{0} ↗",
    "{0} ↗"
  ],
  [
    "{0} · {1}",
    "{0} · {1}"
  ],
  [
    "{0}:",
    "{0} :"
  ],
  [
    "Practice · {0}",
    "Entraînement · {0}"
  ],
  [
    "{0} check",
    "{0} contrôle"
  ],
  [
    "{0} checks",
    "{0} contrôles"
  ],
  [
    "Loop · {0} · port {1}",
    "Boucle · {0} · port {1}"
  ],
  [
    "Loop · {0}",
    "Boucle · {0}"
  ],
  [
    "{0} · round {1}",
    "{0} · série {1}"
  ],
  [
    "{0} current {1} · Round {2}",
    "{0} {1} actuel(s) · série {2}"
  ],
  [
    "VFL on fiber from {0} to CAS {1}",
    "VFL sur fibre · {0} → CAS {1}"
  ],
  [
    "Case history",
    "Historique du cas"
  ],
  [
    "Light at {0}; {1}",
    "Lumière à {0} ; {1}"
  ],
  [
    "{0} at {1}",
    "{0} à {1}"
  ],
  [
    "“I’m {0}”",
    "« Je suis {0} »"
  ],
  [
    "{0} current check · Round {1}",
    "{0} contrôle actuel · série {1}"
  ],
  [
    "{0} current checks · Round {1}",
    "{0} contrôles actuels · série {1}"
  ],
  [
    "Question {0} of {1}",
    "Question {0} sur {1}"
  ],
  [
    "Practice {0} of {1}",
    "Entraînement {0} sur {1}"
  ],
  [
    "Expected at {0} · {1}",
    "Attendu à {0} · {1}"
  ],
  [
    "Shown at {0} · {1}",
    "Affiché à {0} · {1}"
  ],
  [
    "VFL {0} → {1} · strand {2}",
    "VFL {0} → {1} · fibre {2}"
  ],
  [
    "VFL {0} → {1} · port {2} · strand {3}",
    "VFL {0} → {1} · port {2} · fibre {3}"
  ],
  [
    "VFL {0} → {1} · loose head · port {2} · strand {3}",
    "VFL {0} → {1} · tête débranchée · port {2} · fibre {3}"
  ],
  [
    "{0} → CAS {1}",
    "{0} → CAS {1}"
  ],
  [
    "through CAS",
    "à travers CAS"
  ],
  [
    "loose MMC head",
    "tête MMC débranchée"
  ],
  [
    "VFL {0} · A {1} · B {2}",
    "VFL {0} · A {1} · B {2}"
  ],
  [
    "{0} to +{1}",
    "{0} à +{1}"
  ],
  [
    "Then check your answers.",
    "Puis vérifiez vos réponses."
  ],
  ["Rack", "Baie"],
  ["Local", "Local"],
  ["Fanout", "Épanouissement"],
  ["Following {0} TX → {1} RX.", "Suivi de {0} TX → {1} RX."],
  ["Local loop", "Boucle locale"],
  ["Remote loop", "Boucle distante"],
  ["Local LC legs", "Branches LC locales"],
  ["Remote LC legs", "Branches LC distantes"],
  ["Local LC legs unplugged", "Branches LC locales débranchées"],
  ["Remote LC legs unplugged", "Branches LC distantes débranchées"],
  ["Local optic only", "Optique locale uniquement"],
  ["Both devices + full path", "Deux appareils + chemin complet"],
  ["At either optic", "Sur l’une ou l’autre optique"],
  ["Optic under test", "Optique testée"],
  ["Direct loop · external fiber bypassed", "Boucle directe · fibre externe exclue"],
  ["TX → loop → RX", "TX → boucle → RX"],
  ["Loop faces {0}. Read returning RX at that device.", "La boucle est orientée vers {0}. Lisez le RX de retour sur cet appareil."],
  ["Local loop: {0}", "Boucle locale : {0}"],
  ["Remote loop: {0}", "Boucle distante : {0}"],
  ["Local: {0} · Remote: {1}", "Local : {0} · Distant : {1}"],
  ["Local loop at {0} · {1}", "Boucle locale à {0} · {1}"],
  ["Remote loop at {0} · {1}", "Boucle distante à {0} · {1}"],
  ["Local → {0}", "Local → {0}"],
  ["Remote → {0}", "Distant → {0}"],
  ["Device IDs + optic sockets at the tested ends, e.g. 25/1 vs 25/5", "Identifiants des appareils + prises optiques aux extrémités testées, par ex. 25/1 ou 25/5"],
  ["A = local TX → remote RX · B = remote TX → local RX", "A = TX local → RX distant · B = TX distant → RX local"],
  ["Simulated readings at both ends.", "Mesures simulées aux deux extrémités."],
  ["Drag LC onto either optic to start. At a cassette, choose the optic under test. Earlier findings stay in this case.", "Déposez LC sur l’une des optiques pour commencer. Sur une cassette, choisissez l’optique testée. Les observations précédentes restent dans ce dossier."],
  ["Remove test tools, confirm the real mapped connections, then check required readings and link status at both accessible devices. Is the link working now?", "Retirez les outils, confirmez les connexions réelles prévues, puis vérifiez les mesures requises et l’état du lien sur les deux appareils accessibles. Le lien fonctionne-t-il maintenant ?"],
  ["Only the recorded source, pair and section are checked. Untested parts and the live link remain unverified.", "Seuls la source, la paire et le tronçon consignés sont contrôlés. Les parties non testées et le lien en service restent à vérifier."],
  ["Remove the loop and restore the mapped link. Check the remote optic if accessible, then verify readings and link status at both ends.", "Retirez la boucle et rétablissez le lien prévu. Contrôlez l’optique distante si elle est accessible, puis les mesures et l’état du lien aux deux extrémités."],
  ["Check the remote optic and loop setup", "Vérifiez l’optique distante et le montage de boucle"],
  ["The remote direct loop failed. Its external fiber is bypassed; local optic results are separate.", "La boucle directe distante a échoué. Sa fibre externe est exclue ; les résultats de l’optique locale sont distincts."],
  ["Inspect, clean and reseat the remote optic and LC loop. Verify loop mapping, attenuation and host status; compare a compatible known-good setup.", "Inspectez, nettoyez et réenclenchez l’optique distante et la boucle LC. Vérifiez le câblage de boucle, l’atténuation et l’état de l’hôte ; comparez avec un montage compatible fonctionnel."],
  ["Remote loop failed at {0}", "Échec de la boucle distante à {0}"],
  ["Remote light returned at {0}, but the loop failed at {1}.", "La lumière distante revenait à {0}, mais la boucle a échoué à {1}."],
  ["This remote loop includes the remote optic, added fiber, connections and loop setup.", "Cette boucle distante inclut l’optique distante, la fibre ajoutée, les connexions et le montage de boucle."],
  ["Loop directly at the remote optic first. Then extend toward the local device one cassette at a time.", "Commencez par une boucle directe sur l’optique distante. Avancez ensuite vers l’appareil local, une cassette à la fois."],
  ["Recheck the failed loop setup. Test the section added toward the local device; compare its connections before replacing a part.", "Revérifiez le montage ayant échoué. Testez le tronçon ajouté vers l’appareil local ; comparez ses connexions avant de remplacer une pièce."],
  ["Remote loop passed to {0}", "Boucle distante réussie jusqu’à {0}"],
  ["The remote optic returned light through this tested pair. This does not prove the local optic or the restored live link.", "L’optique distante a reçu le retour lumineux par cette paire testée. Cela ne valide ni l’optique locale ni le lien rétabli en service."],
  ["Move the remote-facing loop to {0} and compare the result.", "Déplacez la boucle orientée vers l’optique distante à {0} et comparez le résultat."],
  ["Compare with local-side checks, then Normalize and verify the mapped live link at both ends.", "Comparez avec les contrôles locaux, puis Normalisez et vérifiez le lien prévu aux deux extrémités."],
  ["Checks from both ends leave an untested section", "Les contrôles des deux côtés laissent un tronçon non testé"],
  ["Loop coverage meets from both ends", "Les zones testées en boucle se rejoignent"],
  ["Local checks reach {0}. Remote checks reach {1}.", "Les contrôles locaux atteignent {0}. Les contrôles distants atteignent {1}."],
  ["Test the section between these points, including both cassette connections. A gap in coverage is not proof of a faulty component.", "Testez le tronçon entre ces points, y compris les deux connexions de cassette. Une zone non testée ne prouve pas qu’un composant est défectueux."],
  ["Remove the loops, Normalize, confirm the mapped TX-to-RX pairing, then verify readings and link status at both devices.", "Retirez les boucles, Normalisez, confirmez l’appariement TX-RX prévu, puis vérifiez les mesures et l’état du lien sur les deux appareils."],
  ["An opposite-end loop passed across this section. Recheck the tested pair, mating faces, loop setup and optic limits; these results do not yet identify a failed part.", "Une boucle depuis l’autre extrémité a réussi sur ce tronçon. Revérifiez la paire, les faces en contact, le montage et les limites optiques ; ces résultats n’identifient pas encore une pièce défaillante."],
  ["Loop tests do not prove the restored end-to-end pairing or live link.", "Les boucles ne valident pas l’appariement rétabli de bout en bout ni le lien en service."],
  ["Verify FIM ports and TX-to-RX pairing. Compare both optic tests and trace accessible strands; keep untested sections unverified.", "Vérifiez les ports FIM et l’appariement TX-RX. Comparez les tests des deux optiques et tracez les fibres accessibles ; les tronçons non testés restent à vérifier."],
  ["Place a supported LC loop at either accessible optic. Record its result, then extend from that same device through the passives.", "Placez une boucle LC compatible sur l’une des optiques accessibles. Notez le résultat, puis étendez le test depuis ce même appareil à travers les passifs."],
  ["Recorded remote loop coverage to CAS {0}. Live link unverified.", "Couverture de boucle distante consignée jusqu’à CAS {0}. Lien en service non vérifié."],
  ["Interactive fiber path. TX sends along one strand; RX receives along the other. Choose either optic or an accessible cassette.", "Chemin fibre interactif. TX émet sur une fibre ; RX reçoit sur l’autre. Choisissez une optique ou une cassette accessible."],
  ["Your checks · {0} · from {1}", "Vos contrôles · {0} · depuis {1}"],
  ["drop on either optic.", "déposez-la sur l’une des optiques."],
  ["{0}: drop on either optic. You can also tap the target.", "{0} : déposez-la sur l’une des optiques. Vous pouvez aussi toucher la cible."],
  ["Light path: {0} → {1} → {2}", "Trajet lumineux : {0} → {1} → {2}"],
  ["You confirmed the required readings and link status at the accessible devices after removing the tools.", "Vous avez confirmé les mesures requises et l’état du lien sur les appareils accessibles après avoir retiré les outils."],
  ["Required readings and link normal", "Mesures requises et lien normaux"],
  ["CAS {0} → Remote LC legs", "CAS {0} → branches LC distantes"],
  ["VFL on fiber from {0} to Remote optic", "VFL sur la fibre de {0} à l’optique distante"],
  ["{0} to Remote optic, {1}", "{0} vers l’optique distante, {1}"],
  ["The selected optic is not emitting in this example. VFL uses its own light source.", "L’optique sélectionnée n’émet pas dans cet exemple. Le VFL utilise sa propre source lumineuse."],
  ["The selected optic receiver fails in this example even though its TX still emits.", "Le récepteur de l’optique sélectionnée est défaillant dans cet exemple, même si son TX émet toujours."],
  ["Disconnected LC legs only", "Branches LC débranchées uniquement"],
  ["VFL attached to", "VFL raccordé à"],
  ["Look for light at", "Chercher la lumière à"],
  ["VFL stays on the LC leg. Plug or unplug the MMC to check for light.", "Le VFL reste sur la branche LC. Branchez ou débranchez le MMC pour vérifier la lumière."],
  ["Attach VFL only to disconnected LC legs. CAS and MMC are viewing points.", "Raccordez le VFL uniquement aux branches LC débranchées. CAS et MMC sont des points d’observation."],
  ["{0}: attach to disconnected local or remote LC legs, then choose where to check for light. You can also tap the target.", "{0} : raccordez aux branches LC débranchées locales ou distantes, puis choisissez où vérifier la lumière. Vous pouvez aussi toucher la cible."],
  ["Fiber section: {0} → {1}", "Section de fibre : {0} → {1}"],
  ["A / B illustrate one pair, not MMC pin numbers. Follow your actual channel map. Attach VFL only to disconnected LC legs; view light indirectly at the MMC or CAS.", "A / B représentent une paire, pas les numéros de broches MMC. Suivez votre plan réel des canaux. Raccordez le VFL uniquement aux branches LC débranchées ; observez la lumière indirectement au MMC ou au CAS."],
  ["Verify the VFL and LC connection.", "Vérifiez le VFL et la connexion LC."],
  ["Check the VFL on a known-good LC reference using the same LC connection used for {0}. Does the reference pass light?", "Testez le VFL sur une référence LC en bon état avec la même connexion LC utilisée pour {0}. La référence laisse-t-elle passer la lumière ?"],
  ["The reference is also dark. Check the VFL, LC connection and reference lead before blaming the installed fiber.", "La référence est également sombre. Vérifiez le VFL, la connexion LC et le cordon de référence avant de mettre en cause la fibre installée."],
  ["Compare one known-good compatible cable / fanout in place of the suspect assembly, keeping the same VFL, LC attachment and mapped {0} channel. Record the replacement result; the diagram still shows the original observations.", "Comparez un câble ou fanout compatible en bon état à l’ensemble suspect, avec le même VFL, le même raccordement LC et le canal {0} prévu. Enregistrez le résultat du remplacement ; le schéma conserve les observations d’origine."],
  ["Both assemblies were dark in this setup. Recheck the VFL, LC attachment and channel mapping. The original assembly is not cleared. Use a loss test and, where suitable, OTDR to locate an unresolved fault.", "Les deux ensembles étaient sombres dans cette configuration. Revérifiez le VFL, le raccordement LC et le plan des canaux. L’ensemble d’origine reste suspect. Utilisez une mesure de perte et, si adapté, un OTDR pour localiser le défaut restant."],
  ["Verify labels, LC attachment and test setup.", "Vérifiez les étiquettes, le raccordement LC et la configuration du test."],
  ["Keep the VFL on LC {0}. Verify its LC connection, then unplug the incoming MMC at CAS {1} and check its loose head for light.", "Gardez le VFL sur LC {0}. Vérifiez sa connexion LC, puis débranchez le MMC entrant à CAS {1} et cherchez la lumière à sa tête libre."],
  ["The test fiber is disconnected from the optics; VFL is attached to an LC leg.", "La fibre de test est débranchée des optiques ; le VFL est raccordé à une branche LC."],
  ["VFL from {0} → {1}", "VFL depuis {0} → {1}"],
  ["Path", "Trajet"],
  // Connected troubleshooting case.
  ["Work one case from both ends: loops, mapping, strands and final verification.","Suivez un cas depuis les deux extrémités : bouclages, correspondances, fibres et vérification finale."],
  ["One case · new observations at each step","Un cas · de nouvelles observations à chaque étape"],
  ["Retake this case","Reprendre ce cas"],
  ["Combine tests from both ends","Combiner les tests des deux extrémités"],
  ["Both end loops pass. Which section has not been covered by these tests?","Les deux bouclages aux extrémités réussissent. Quel tronçon ces tests ne couvrent-ils pas ?"],
  ["Local optic through its LC leg to CAS 1.","De l’optique locale à CAS 1 par sa branche LC."],
  ["CAS 1 to CAS 2, including the connections between them.","De CAS 1 à CAS 2, y compris leurs connexions intermédiaires."],
  ["CAS 2 through its LC leg to the remote optic.","De CAS 2 à l’optique distante par sa branche LC."],
  ["The local loop ends at CAS 1; the remote loop ends at CAS 2. Neither includes the middle section. Investigate that gap without assuming a particular part is faulty.","Le bouclage local s’arrête à CAS 1 ; le distant à CAS 2. Aucun n’inclut le tronçon central. Examinez ce tronçon sans supposer qu’un composant précis est défectueux."],
  ["Two passing ends leave the middle untested.","Deux extrémités validées laissent le milieu non testé."],
  ["Verify an observed destination","Vérifier la destination observée"],
  ["The VFL trace reaches a different port from FIM. Which check addresses this new evidence?","Le tracé VFL atteint un port différent de celui du FIM. Quel contrôle répond à cette nouvelle observation ?"],
  ["Compare actual ports, fanout labels and the route against FIM.","Comparez les ports réels, les étiquettes du fanout et le trajet avec le FIM."],
  ["Repeat the direct optic loop to check the local light source.","Répétez le bouclage direct de l’optique pour vérifier la source locale."],
  ["Measure optical loss before checking the destination mismatch.","Mesurez la perte optique avant de vérifier l’écart de destination."],
  ["Expected Port 12 and observed Port 13 disagree. Verify the actual patching and the record before an authorized correction. A wrong destination does not identify a failed optic.","Le port attendu 12 et le port observé 13 diffèrent. Vérifiez le raccordement réel et le dossier avant une correction autorisée. Une mauvaise destination ne désigne pas une optique défectueuse."],
  ["Resolve the mapping mismatch before trusting the route.","Résolvez l’écart de correspondance avant de valider le trajet."],
  ["Keep strand evidence separate","Distinguer les observations de chaque fibre"],
  ["The mapping is corrected and each strand is traced again. What do these results support?","La correspondance est corrigée et chaque fibre est retracée. Que permettent de conclure ces résultats ?"],
  ["Strand A proves both paths through the shared MMC are healthy.","La fibre A prouve que les deux chemins du MMC commun sont sains."],
  ["The dark strand confirms that its MMC ferrule is damaged.","La fibre sans lumière confirme que sa férule MMC est endommagée."],
  ["Strand B needs more checks; its failed part is still unknown.","La fibre B nécessite d’autres contrôles ; le composant en cause reste inconnu."],
  ["A and B are separate paths. With the VFL and LC connection checked, investigate B’s mapped fiber and interfaces for seating, contamination, damage or loss. These observations do not distinguish a bad leg from a ferrule or another connection.","A et B sont des chemins distincts. Une fois le VFL et la connexion LC vérifiés, examinez la fibre B et ses interfaces prévues : insertion, contamination, dommages ou perte. Ces observations ne distinguent pas une branche défectueuse d’une férule ou d’une autre connexion."],
  ["One passing strand does not clear the other.","Une fibre validée ne valide pas l’autre."],
  ["Separate a trace from service health","Distinguer le tracé de l’état du service"],
  ["A loose connection is corrected. Both strands now trace correctly. After Normalize, RX is still low. What next?","Une connexion lâche est corrigée. Les deux fibres sont maintenant tracées correctement. Après Normaliser, RX reste faible. Quelle suite ?"],
  ["Repeat the same VFL trace to confirm the already-matched destination.","Répétez le même tracé VFL pour confirmer la destination déjà vérifiée."],
  ["Investigate connections and attenuation with an appropriate optical loss test.","Examinez les connexions et l’atténuation avec un test de perte optique adapté."],
  ["Check the LLDP device name and close the case if it matches.","Vérifiez le nom de l’équipement LLDP et clôturez le cas s’il correspond."],
  ["−4.40 dBm is below the supplied −3.00 minimum. Red light reaching the expected port supports continuity and mapping, but does not establish acceptable service-wavelength loss. Keep investigating the weak service reading.","−4.40 dBm est inférieur au minimum fourni de −3.00. La lumière rouge au port attendu étaye la continuité et la correspondance, mais ne prouve pas une perte acceptable à la longueur d’onde de service. Poursuivez l’analyse de la faible puissance en service."],
  ["A correct trace can still leave excessive optical loss.","Un tracé correct peut encore présenter une perte optique excessive."],
  ["Verify the complete restored connection","Vérifier toute la connexion rétablie"],
  ["Further approved work brings this RX into range. Which two checks are still needed before closing the case?","D’autres interventions approuvées ramènent cette RX dans la plage. Quels deux contrôles restent nécessaires avant de clôturer le cas ?"],
  ["Check every required TX and RX lane against its installed limits.","Comparez chaque voie TX et RX requise aux limites du matériel installé."],
  ["Confirm link operation and the expected remote device and port.","Confirmez le fonctionnement du lien et l’équipement et le port distants attendus."],
  ["Use the earlier end loops as the final check of every service lane.","Utilisez les anciens bouclages comme contrôle final de toutes les voies en service."],
  ["Record this one RX reading as proof that the entire link is healthy.","Consignez cette seule lecture RX comme preuve que tout le lien est sain."],
  ["One improved RX is only one observation. Verify all required readings and link operation, and compare the reported endpoint with the assignment. Record what changed and the final results; do not claim one part caused everything.","Une RX améliorée n’est qu’une observation. Vérifiez toutes les lectures requises et le lien, puis comparez l’extrémité signalée à l’affectation. Consignez les changements et les résultats finaux ; n’attribuez pas tout à un seul composant."],
  ["Close with verified readings, link operation and endpoint identity.","Clôturez après vérification des lectures, du lien et de l’identité distante."],
  ["Loop coverage from both ends","Couverture des bouclages depuis les deux extrémités"],
  ["Local loop: pass","Bouclage local : réussi"],
  ["LC leg + connections to CAS 1","Branche LC + connexions jusqu’à CAS 1"],
  ["Remote loop: pass","Bouclage distant : réussi"],
  ["LC leg + connections to CAS 2","Branche LC + connexions jusqu’à CAS 2"],
  ["No test across this section yet","Aucun test de ce tronçon pour le moment"],
  ["Between the two end loops","Entre les deux bouclages d’extrémité"],
  ["Each loop used its assigned pair and a valid setup. The middle patching is not yet verified.","Chaque bouclage utilisait sa paire affectée et un montage valide. Le raccordement central n’est pas encore vérifié."],
  ["Earlier checks: both end loops passed","Contrôles précédents : les deux bouclages ont réussi"],
  ["Disconnected local LC leg","Branche LC locale déconnectée"],
  ["Through CAS 1 → toward CAS 2","Via CAS 1 → vers CAS 2"],
  ["Light detected","Lumière détectée"],
  ["No light detected","Aucune lumière détectée"],
  ["Active optics are disconnected. VFL stays on the LC leg; CAS is the observation point. Detect light indirectly.","Les optiques actives sont déconnectées. Le VFL reste sur la branche LC ; CAS est le point d’observation. Détectez la lumière indirectement."],
  ["Authorized mapping correction completed; retest at the expected port","Correction autorisée de la correspondance terminée ; retestez au port attendu"],
  ["VFL moved between disconnected LC strands A and B. The VFL and LC connection passed a known-good reference check.","Le VFL a été déplacé entre les fibres LC déconnectées A et B. Le VFL et la connexion LC ont réussi un contrôle sur une référence connue comme bonne."],
  ["Loose connection corrected → both strands traced → Normalize","Connexion lâche corrigée → deux fibres tracées → Normaliser"],
  ["VFL result","Résultat VFL"],
  ["A and B: light detected","A et B : lumière détectée"],
  ["After further approved work · service restored for verification","Après d’autres interventions approuvées · service rétabli pour vérification"],
  ["One measured RX","Une RX mesurée"],
  ["Link + endpoint identity","Lien + identité de l’extrémité"],
  ["1 · Compare loops","1 · Comparer les bouclages"],
  ["2 · Check destination","2 · Vérifier la destination"],
  ["3 · Check both strands","3 · Vérifier les deux fibres"],
  ["4 · Check service light","4 · Vérifier la lumière de service"],
  ["5 · Verify before closing","5 · Vérifier avant de clôturer"],
  ["Combine the coverage, not the conclusions. A local loop to CAS 1 and a remote loop to CAS 2 leave the section between the cassettes untested. A passing end does not verify that gap.","Combinez les couvertures, pas les conclusions. Un bouclage local jusqu’à CAS 1 et un distant jusqu’à CAS 2 laissent le tronçon entre les cassettes non testé. Une extrémité validée ne vérifie pas cet intervalle."],
  ["Trace from a disconnected LC leg, with active optics isolated. If the observed port differs from FIM, compare the labels and physical route with the assignment. Verify which is wrong before making an authorized correction.","Tracez depuis une branche LC déconnectée, les optiques actives étant isolées. Si le port observé diffère du FIM, comparez les étiquettes et le trajet physique avec l’affectation. Déterminez ce qui est erroné avant une correction autorisée."],
  ["After correcting the mapping, test each assigned strand. A working strand does not clear its neighbor. Verify the VFL and LC connection with a known-good reference, then isolate the dark path and its interfaces. Do not name a ferrule or leg as faulty from this observation alone.","Après correction de la correspondance, testez chaque fibre affectée. Une fibre fonctionnelle ne valide pas sa voisine. Vérifiez le VFL et la connexion LC avec une référence connue comme bonne, puis isolez le chemin sombre et ses interfaces. Cette seule observation ne désigne ni une férule ni une branche défectueuse."],
  ["After correcting a connection, both strands can pass red light while service RX remains low. Normalize restores the assigned patching; it does not declare the link healthy. Inspect remaining connections and use an appropriate optical loss test.","Après correction d’une connexion, les deux fibres peuvent transmettre la lumière rouge alors que RX en service reste faible. Normaliser rétablit le raccordement prévu ; cela ne valide pas le lien. Inspectez les connexions restantes et effectuez un test de perte optique adapté."],
  ["An improved reading is progress. Check all required TX/RX lanes against the installed limits, verify link operation and the expected device and port, then record the final results. Each check answers a different question.","Une lecture améliorée est un progrès. Comparez toutes les voies TX/RX requises aux limites installées, vérifiez le lien et l’équipement et le port attendus, puis consignez les résultats finaux. Chaque contrôle répond à une question différente."],
  ["Work one case from both ends","Suivre un cas depuis les deux extrémités"],
  ["Follow the new evidence. The next check changes as you learn more.","Suivez les nouvelles observations. Le prochain contrôle évolue à mesure que vous en apprenez davantage."],
  ["Worked case steps","Étapes du cas expliqué"],
  ["Each loop used its assigned pair and a valid setup.","Chaque bouclage utilisait sa paire affectée et un montage valide."],
  ["Example RX limits: −3.00 to +3.00 dBm","Limites RX de l’exemple : −3.00 à +3.00 dBm"],
  ["Other required lanes","Autres voies requises"],
  ["Not yet checked","Pas encore vérifié"],
  ["Recorded VFL path","Parcours VFL enregistré"],
  ["Recorded checks, not live light.","Contrôles enregistrés, pas de lumière en temps réel."],
  ["Viewing here","Point observé"],
  ["Loose MMC only","MMC débranché uniquement"],
  ["Red: confirmed light","Rouge : lumière confirmée"],
  ["Amber: investigate","Orange : à examiner"],
  ["Dashed: not checked","Pointillés : non contrôlé"],
  ["Fiber / contacts suspect","Fibre / contacts suspects"],
  ["MMC / CAS contact suspect","Contact MMC / CAS suspect"],
  ["Recheck observations","Revérifier les observations"],
  ["The incoming fiber passes visible light to the loose MMC head. The dark through-CAS result makes this channel’s mating contact suspect: contamination, damage, alignment or seating.","La fibre entrante transmet la lumière visible jusqu’à la tête MMC débranchée. L’absence de lumière à travers le CAS met en cause le contact de cette voie : contamination, dommage, alignement ou enclenchement."],
  ["{0} passes visible light; {1} does not. The MMC ferrule holds separate fibers. Investigate {1}’s fiber and its end-face contacts; {0} passing does not clear them.","{0} transmet la lumière visible ; {1} ne la transmet pas. La férule MMC maintient des fibres distinctes. Examinez la fibre de {1} et ses contacts d’extrémité ; le passage de lumière sur {0} ne les valide pas."],
  ["Does light reach the expected channel?","La lumière atteint-elle la voie attendue ?"],
  ["Light on another channel or port","Lumière sur une autre voie ou un autre port"],
  ["Other channel ({0})","Autre voie ({0})"],
  ["Weak light","Lumière faible"],
  ["Weak light reported here","Lumière faible signalée ici"],
  ["Strand {0}: weak light reported","Brin {0} : lumière faible signalée"],
  ["Dim VFL light is a visual observation, not a loss measurement.","Une faible lueur du VFL est une observation visuelle, pas une mesure de perte."],
  ["Keep the VFL on this LC strand. Compare the loose incoming MMC head with the through-CAS result; inspect the mating connection if the glow changes there.","Gardez le VFL sur ce brin LC. Comparez la tête MMC entrante débranchée avec le résultat à travers le CAS ; inspectez le raccordement si la lueur change à cet endroit."],
  ["Check the VFL and LC seating with a known-good reference lead. Inspect the mapped fiber ends and bends, then use an optical loss test to measure loss.","Vérifiez le VFL et l’enclenchement LC avec un cordon de référence en bon état. Inspectez les extrémités et les courbures de la fibre repérée, puis mesurez la perte avec un test de perte optique."],
  ["Open here","Ouvert ici"],
  ["CAS {0} · Patched port","CAS {0} · Port raccordé"],
  ["Previous port","Port précédent"],
  ["Next port","Port suivant"],
  ["FIM · Port {0}","FIM · Port {0}"],
  ["Use FIM port {0}","Utiliser le port FIM {0}"],
  ["Choose a port from 1 to 32.","Choisissez un port de 1 à 32."],
  ["Patched port updated. Recheck this section.","Port raccordé mis à jour. Revérifiez cette section."],
  ["Tap an LC leg, then mark the light at the viewing point.", "Touchez une branche LC, puis indiquez la lumière au point d’observation."],
  ["CAS {0} · Viewing port", "CAS {0} · Port d’observation"],
  ["Viewing port updated. Recheck this section.", "Port d’observation mis à jour. Revérifiez ce tronçon."],
  ["Inspect the strand and its connections; compare with an earlier CAS.", "Inspectez la fibre et ses connexions ; comparez avec un CAS précédent."],
  ["Final check · normal operation", "Vérification finale · fonctionnement normal"],
  ["Use after reconnecting the real service path.", "À utiliser après avoir reconnecté le chemin réel de service."],
  ["A loop or VFL pass checks only part of the connection. This final check confirms whether the devices communicate after the tools are removed.", "Un test de boucle ou VFL réussi ne vérifie qu’une partie de la connexion. Ce contrôle final confirme si les appareils communiquent une fois les outils retirés."],
  ["Reconnect the mapped path. Check current TX/RX against the optic limits and confirm link status at the accessible devices.", "Reconnectez le chemin documenté. Comparez les mesures TX/RX actuelles aux limites du module et confirmez l’état du lien sur les appareils accessibles."],
  ["Not ready? Keep testing; this check is optional until you finish.", "Pas encore prêt ? Continuez les tests ; cette vérification reste facultative tant que vous n’avez pas terminé."],
  ["Possible causes to check", "Causes possibles à vérifier"],
  ["Evidence details & references", "Détails des observations et références"],
  ["Optical readings", "Mesures optiques"],
  ["VFL source or reference connection", "Source VFL ou connexion de référence"],
  ["Wrong port or fanout", "Port ou fanout incorrect"],
  ["End-to-end TX / RX pairing", "Correspondance TX / RX de bout en bout"],
  ["Dirty or loose connection", "Connexion sale ou mal enfichée"],
  ["Bend, break, splice or damaged fiber contact", "Courbure, rupture, épissure ou contact de fibre endommagé"],
  ["Damage seen during inspection", "Dommage observé à l’inspection"],
  ["Original assembly or mating contact", "Ensemble d’origine ou contact d’accouplement"],
  ["Shared source, mapping or remaining path", "Source commune, correspondance ou chemin restant"],
  ["Loop connector, mapping or attenuation", "Connecteur, correspondance ou atténuation de boucle"],
  ["Optic or host port", "Module optique ou port de l’appareil"],
  ["Excess optical loss", "Perte optique excessive"],
  ["Optic compatibility or device configuration", "Compatibilité optique ou configuration des appareils"],
  ["Untested remote section or optic", "Section ou module distant non testé"],
  ["Confirm the device, optic socket, fanout and CAS ports. Verify that each TX reaches the intended RX before repeating passed tests.", "Confirmez l’appareil, le logement optique, le fanout et les ports CAS. Vérifiez que chaque TX atteint le RX prévu avant de répéter les tests réussis."],
  ["The fiber checks do not verify this optic. Run its supported direct loop and compare TX and returning RX with its limits.", "Les contrôles de fibre ne valident pas ce module. Effectuez sa boucle directe compatible et comparez TX et RX de retour à ses limites."],
  ["The full accessible route is not yet traced on both strands from this end. Check the missing strand at the farthest accessible point.", "Le chemin accessible complet n’a pas encore été tracé sur les deux fibres depuis cette extrémité. Vérifiez la fibre restante au point accessible le plus éloigné."],
  ["Check the unverified strand", "Vérifier la fibre non testée"],
  ["Visible continuity and loop passes do not measure service loss. Check current TX/RX against each optic’s limits; if power is normal, verify optic compatibility, port state, speed and FEC settings.", "La continuité visible et les boucles réussies ne mesurent pas la perte en service. Comparez TX/RX actuels aux limites de chaque module ; si la puissance est normale, vérifiez la compatibilité, l’état du port, la vitesse et les réglages FEC."],
  ["Check current optical readings and measure loss on the accessible path. Request remote-end readings and checks for the section you cannot reach.", "Vérifiez les mesures optiques actuelles et mesurez la perte sur le chemin accessible. Demandez les mesures et contrôles distants pour la section inaccessible."],
  ["Add CAS","Ajouter un CAS"],
  ["Remove last CAS","Retirer le dernier CAS"],
  ["Port","Port"],
  ["CAS {0} · Mapped port","CAS {0} · Port prévu"],
  ["LC loopback: tap either optic.","Boucle LC : touchez une optique."],
  ["MMC loopback: tap a CAS.","Boucle MMC : touchez un CAS."],
  ["VFL: tap Local or Remote LC legs.","VFL : touchez les brins LC locaux ou distants."],
];
